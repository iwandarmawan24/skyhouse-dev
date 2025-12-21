<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .email-header {
            background: linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%);
            color: #ffffff;
            padding: 30px 20px;
            text-align: center;
        }
        .email-header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
        }
        .email-header p {
            margin: 10px 0 0;
            font-size: 14px;
            opacity: 0.9;
        }
        .email-body {
            padding: 30px 20px;
        }
        .info-section {
            margin-bottom: 25px;
        }
        .info-label {
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            color: #6b7280;
            margin-bottom: 5px;
        }
        .info-value {
            font-size: 16px;
            color: #1f2937;
            padding: 10px 15px;
            background-color: #f9fafb;
            border-left: 3px solid #3B82F6;
            border-radius: 4px;
        }
        .message-box {
            background-color: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            padding: 20px;
            margin-top: 10px;
        }
        .message-box p {
            margin: 0;
            white-space: pre-wrap;
            word-wrap: break-word;
        }
        .email-footer {
            background-color: #f9fafb;
            padding: 20px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
        }
        .email-footer p {
            margin: 5px 0;
            font-size: 12px;
            color: #6b7280;
        }
        .badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 600;
            background-color: #dbeafe;
            color: #1e40af;
        }
        .badge.new {
            background-color: #dcfce7;
            color: #166534;
        }
        .divider {
            height: 1px;
            background-color: #e5e7eb;
            margin: 25px 0;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="email-header">
            <h1>📬 New Contact Form Submission</h1>
            <p>Skyhouse Alamsutera</p>
        </div>

        <!-- Body -->
        <div class="email-body">
            <!-- Status Badge -->
            <div style="margin-bottom: 20px;">
                <span class="badge new">NEW SUBMISSION</span>
            </div>

            <!-- Contact Information -->
            <div class="info-section">
                <div class="info-label">Full Name</div>
                <div class="info-value">{{ $submission->full_name }}</div>
            </div>

            <div class="info-section">
                <div class="info-label">Email Address</div>
                <div class="info-value">
                    <a href="mailto:{{ $submission->email }}" style="color: #3B82F6; text-decoration: none;">
                        {{ $submission->email }}
                    </a>
                </div>
            </div>

            <div class="info-section">
                <div class="info-label">Phone Number</div>
                <div class="info-value">
                    <a href="tel:{{ $submission->phone }}" style="color: #3B82F6; text-decoration: none;">
                        {{ $submission->phone }}
                    </a>
                </div>
            </div>

            <div class="info-section">
                <div class="info-label">Current Residence</div>
                <div class="info-value">{{ $submission->residence }}</div>
            </div>

            <div class="divider"></div>

            <!-- Subject and Project -->
            <div class="info-section">
                <div class="info-label">Subject</div>
                <div class="info-value">
                    <strong>{{ ucfirst($submission->subject) }}</strong>
                </div>
            </div>

            <div class="info-section">
                <div class="info-label">Project Interest</div>
                <div class="info-value">{{ ucfirst($submission->project) }}</div>
            </div>

            <div class="divider"></div>

            <!-- Message -->
            <div class="info-section">
                <div class="info-label">Message</div>
                <div class="message-box">
                    <p>{{ $submission->message }}</p>
                </div>
            </div>

            <div class="divider"></div>

            <!-- Submission Details -->
            <div style="font-size: 12px; color: #6b7280;">
                <p><strong>Submission ID:</strong> #{{ $submission->id }}</p>
                <p><strong>Submitted at:</strong> {{ $submission->created_at->format('F d, Y - h:i A') }}</p>
            </div>
        </div>

        <!-- Footer -->
        <div class="email-footer">
            <p><strong>Skyhouse Alamsutera</strong></p>
            <p>Jl. Alamsutera Boulevard No.88, Pakulonan Barat, Kelapa Dua</p>
            <p>Tangerang, Banten 15810</p>
            <p style="margin-top: 15px;">
                This is an automated message from your website contact form.
            </p>
        </div>
    </div>
</body>
</html>
