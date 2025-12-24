# Resume Request System

## Overview

The resume request system stores email addresses in the database when users request your resume. You can manually send resumes later using the stored email addresses.

## How It Works

1. **User requests resume**: When someone clicks "Send Me Resume" and enters their email, it's stored in the `resume_requests` table
2. **You get notified**: Check pending requests using the CLI tool
3. **You send manually**: Send resumes via your preferred email method and mark them as sent

## Managing Resume Requests

### View All Requests
```bash
npm run resume-requests list
```

### View Pending (Unsent) Requests
```bash
npm run resume-requests pending
```

### Mark a Request as Sent
After you manually send a resume to someone:
```bash
npm run resume-requests mark-sent <REQUEST_ID>
```

Example:
```bash
npm run resume-requests mark-sent clxxxxx123
```

## Database Schema

The `resume_requests` table stores:
- `id`: Unique identifier
- `email`: User's email address
- `sent`: Boolean flag (false by default)
- `sentAt`: Timestamp when marked as sent
- `createdAt`: When the request was created

## Future Enhancement (Option 2)

In 2 days, we'll implement automated email sending using Resend with a verified domain:

1. **Get a domain** (if you don't have one)
2. **Verify domain in Resend**:
   - Go to [resend.com/domains](https://resend.com/domains)
   - Add your domain
   - Add DNS records (SPF, DKIM)
3. **Update the code**:
   - Change `from` address to use your domain (e.g., `hello@yourdomain.com`)
   - Uncomment the email sending code
   - Emails will be sent automatically

## Notes

- All email addresses are stored in lowercase and trimmed
- The modal shows: "Request received! Your resume will be sent shortly."
- Users can still download the resume directly using the "Download Resume" button
