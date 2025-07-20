<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Verification Code</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
        }

        .logo {
            max-height: 60px;
            margin-bottom: 15px;
        }

        .content {
            padding: 30px 20px;
            text-align: center;
        }

        .otp-box {
            font-family: monospace;
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 5px;
            padding: 15px;
            margin: 25px auto;
            max-width: 300px;
            background-color: #f5f5f5;
            border-radius: 6px;
            border: 1px solid #e0e0e0;
            color: #333;
        }

        .footer {
            text-align: center;
            padding-top: 20px;
            border-top: 1px solid #eee;
            font-size: 12px;
            color: #888;
        }

        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #4285F4;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            font-weight: 500;
            margin-top: 20px;
        }

        .expiry {
            color: #d32f2f;
            font-weight: 500;
            margin: 20px 0;
        }

        .info {
            margin-top: 25px;
            padding: 15px;
            background-color: #f8f9fa;
            border-radius: 4px;
            font-size: 14px;
            color: #555;
            text-align: left;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <!-- Replace with your company logo URL -->
            <img src="{{ $logo ?? 'https://yourcompany.com/logo.png' }}" alt="{{ $companyName ?? 'Company' }} Logo"
                class="logo">
            <h2>One-Time Password Verification</h2>
        </div>

        <div class="content">
            <p>Hello {{ $name ?? 'there' }},</p>

            <p>You've requested a one-time password (OTP) to verify your identity. Please use the code below to complete
                your authentication:</p>

            <div class="otp-box">{{ $otp }}</div>

            <p class="expiry">This code will expire in <strong>{{ $expiryTime ?? '10 minutes' }}</strong>.</p>

            @if(isset($actionUrl))
                <a href="{{ $actionUrl }}" class="button">Verify Account</a>
            @endif

            <div class="info">
                <p><strong>Security Notice:</strong></p>
                <ul>
                    <li>If you didn't request this code, please ignore this email or contact our support team.</li>
                    <li>Never share this code with anyone, including our staff.</li>
                    <li>Our team will never ask for your password or OTP via email or phone.</li>
                </ul>
            </div>
        </div>

        <div class="footer">
            <p>&copy; {{ date('Y') }} {{ $companyName ?? 'Your Company Name' }}. All rights reserved.</p>
            <p>{{ $companyAddress ?? '123 Business Street, City, Country' }}</p>
            <p>
                <a href="{{ $privacyUrl ?? '#' }}"
                    style="color: #4285F4; text-decoration: none; margin-right: 10px;">Privacy Policy</a> |
                <a href="{{ $contactUrl ?? '#' }}" style="color: #4285F4; text-decoration: none;">Contact Us</a>
            </p>
        </div>
    </div>
</body>

</html>