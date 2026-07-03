<?php

namespace App\Grant;

use App\Models\OtpVerification;
use Carbon\Carbon;
use RuntimeException;
use Illuminate\Http\Request;
use App\Exceptions\OtpException;
use Laravel\Passport\Bridge\User;
use League\OAuth2\Server\RequestEvent;
use Psr\Http\Message\ServerRequestInterface;
use League\OAuth2\Server\Grant\AbstractGrant;
use League\OAuth2\Server\Entities\UserEntityInterface;
use League\OAuth2\Server\Entities\ClientEntityInterface;
use League\OAuth2\Server\Exception\OAuthServerException;
use League\OAuth2\Server\ResponseTypes\ResponseTypeInterface;
use League\OAuth2\Server\Repositories\RefreshTokenRepositoryInterface;

class OtpGrant extends AbstractGrant
{
    /**
     * Constructor - sets up the grant and repository
     */
    public function __construct(RefreshTokenRepositoryInterface $refreshTokenRepository)
    {
        $this->setRefreshTokenRepository($refreshTokenRepository);
        $this->refreshTokenTTL = new \DateInterval('P1M');
    }

    /**
     * Handles the main authorization flow
     */
    public function respondToAccessTokenRequest(
        ServerRequestInterface $request,
        ResponseTypeInterface $responseType,
        \DateInterval $accessTokenTTL
    ) {
        // Validate the OAuth2 client (app requesting access)
        $client = $this->validateClient($request);

        // Validate the requested scopes
        $scopes = $this->validateScopes($this->getRequestParameter('scope', $request));

        // Validate the user's OTP credentials
        $user = $this->validateUser($request, $client);

        // Finalize the scopes that will be granted
        $scopes = $this->scopeRepository->finalizeScopes(
            $scopes,
            $this->getIdentifier(),
            $client,
            $user->getIdentifier()
        );

        // Issue and persist the access token
        $accessToken = $this->issueAccessToken(
            $accessTokenTTL,
            $client,
            $user->getIdentifier(),
            $scopes
        );

        // Issue and persist the refresh token
        $refreshToken = $this->issueRefreshToken($accessToken);

        // Add the tokens to response
        $responseType->setAccessToken($accessToken);
        $responseType->setRefreshToken($refreshToken);

        return $responseType;
    }

    /**
     * Validates the user based on OTP credentials
     */
    protected function validateUser(ServerRequestInterface $request, ClientEntityInterface $client)
    {
        // Extract and validate required parameters
        $otp = $this->getRequestParameter('otp', $request);
        if (is_null($otp)) {
            throw OAuthServerException::invalidRequest('otp');
        }

        $username = $this->getRequestParameter('username', $request);
        if (is_null($username)) {
            throw OAuthServerException::invalidRequest('username');
        }

        $otp_scope = $this->getRequestParameter('otp_scope', $request);
        if (is_null($otp_scope)) {
            throw OAuthServerException::invalidRequest('otp_scope');
        }

        // Attempt to find and validate the user with this OTP
        $user = $this->getUserEntityByUserOtp(
            $username,
            $otp,
            $otp_scope,
            $this->getIdentifier(),
            $client
        );

        // If validation fails, throw an exception
        if ($user instanceof UserEntityInterface === false) {
            $this->getEmitter()->emit(new RequestEvent(RequestEvent::USER_AUTHENTICATION_FAILED, $request));
            throw OAuthServerException::invalidCredentials();
        }

        return $user;
    }

    /**
     * Helper method to check if an OTP verification exists
     */
    private function isOtpVerification($code, $username): bool
    {
        $otp = OtpVerification::query()
            ->where('identity', $username)
            // ->where('code', $code)
            ->first();

        return $otp ? true : false;
    }

    /**
     * Looks up the user by username and validates the OTP
     */
    private function getUserEntityByUserOtp($username, $otp, $otp_scope, $grantType, ClientEntityInterface $clientEntity)
    {
        // Get the auth provider configuration (typically 'users')
        $provider = config('auth.guards.api.provider');

        // Get the user model class from configuration
        if (is_null($model = config('auth.providers.' . $provider . '.model'))) {
            throw new RuntimeException('Unable to determine authentication model from configuration.');
        }

        // Find the user by username
        $user = (new $model)->findForPassport($username);

        // Check if the OTP is valid for this user and scope
        $otpVerification = OtpVerification::query()
            ->where('provider', $provider)
            ->where('identity', $username)
            ->where('scope', $otp_scope)
            // ->where('code', $otp)
            ->first();

        // If user or OTP not found, return nothing (authentication fails)
        if (is_null($user) || is_null($otpVerification)) {
            return;
        }
        if (!password_verify($otp, $otpVerification->otp_code)) {
            return;
        }

        // $otpVerification->delete();
        return new User($user->getAuthIdentifier());
    }

    /**
     * Returns the identifier for this grant type
     */
    public function getIdentifier()
    {
        return 'otp_grant';
    }
}