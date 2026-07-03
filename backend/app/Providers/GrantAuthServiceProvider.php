<?php

namespace App\Providers;

use App\Grant\OtpGrant;
use App\Grant\AppleGrant;
use Laravel\Passport\Passport;
use Illuminate\Support\ServiceProvider;
use League\OAuth2\Server\AuthorizationServer;
use Laravel\Passport\Bridge\RefreshTokenRepository;

class GrantAuthServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        app()->afterResolving(AuthorizationServer::class, function (AuthorizationServer $server) {
            // Register OTP Grant
            $server->enableGrantType($this->makeOtpGrant(), Passport::tokensExpireIn());
        });
    }

    public function boot(): void
    {
        //
    }

    protected function makeOtpGrant(): OtpGrant
    {
        $grant = new OtpGrant(
            $this->app->make(RefreshTokenRepository::class)
        );
        $grant->setRefreshTokenTTL(Passport::refreshTokensExpireIn());
        return $grant;
    }
}