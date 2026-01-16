import logging
import httpx
from datetime import datetime
import os

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Admin email - where contact notifications are sent
# Using the Resend account email (free tier only allows sending to your own email)
ADMIN_EMAIL = "akashmalviya244@gmail.com"


def _send_email(to_email: str, subject: str, html_content: str, reply_to: str = None) -> bool:
    """Send email using Resend API (works on Render free tier)"""
    resend_api_key = os.getenv("RESEND_API_KEY", "")
    
    if not resend_api_key:
        logger.warning("RESEND_API_KEY not configured. Email not sent.")
        return False
    
    try:
        logger.info(f"Sending email via Resend API to {to_email}...")
        
        payload = {
            "from": "Akash Portfolio <onboarding@resend.dev>",
            "to": [to_email],
            "subject": subject,
            "html": html_content
        }
        
        if reply_to:
            payload["reply_to"] = reply_to
        
        response = httpx.post(
            "https://api.resend.com/emails",
            headers={
                "Authorization": f"Bearer {resend_api_key}",
                "Content-Type": "application/json"
            },
            json=payload,
            timeout=10.0
        )
        
        if response.status_code == 200:
            logger.info(f"✅ Email sent successfully to {to_email}")
            return True
        else:
            logger.error(f"❌ Resend API error: {response.status_code} - {response.text}")
            return False
        
    except Exception as e:
        logger.error(f"❌ Failed to send email: {str(e)}")
        return False


def send_admin_notification(first_name: str, last_name: str, user_email: str, message: str) -> bool:
    """
    EMAIL 1: Send notification to ADMIN (Akash) when someone submits contact form
    
    - TO: akashpasay567@gmail.com (ADMIN)
    - REPLY-TO: user's email (so admin can reply directly)
    """
    full_name = f"{first_name} {last_name}"
    timestamp = datetime.now().strftime('%B %d, %Y at %I:%M %p')
    
    subject = f"New Contact Message from {full_name}"
    
    html = f"""
    <html>
      <body style="font-family: 'Segoe UI', Arial, sans-serif; padding: 20px; background-color: #f8fafc; margin: 0;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 40px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
          
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="display: inline-block; background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: white; padding: 12px 24px; border-radius: 50px; font-size: 12px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;">
              🎉 New Contact Message
            </div>
          </div>
          
          <div style="background-color: #f0fdf4; border-left: 4px solid #22c55e; padding: 12px 16px; border-radius: 0 8px 8px 0; margin-bottom: 24px;">
            <p style="color: #166534; font-size: 13px; margin: 0; font-weight: 500;">
              ✅ This is a real message from a live user on your portfolio.
            </p>
          </div>
          
          <h2 style="color: #1e293b; margin-bottom: 8px; font-size: 22px; font-weight: 700; text-align: center;">
            Someone Reached Out!
          </h2>
          <p style="color: #64748b; text-align: center; margin-bottom: 30px; font-size: 14px;">
            A visitor has submitted a message through your portfolio contact form.
          </p>
          
          <div style="background-color: #f8fafc; border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid #e2e8f0;">
            <h3 style="color: #475569; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 20px 0;">👤 Client Details</h3>
            
            <div style="margin-bottom: 16px;">
              <span style="color: #94a3b8; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Full Name</span>
              <p style="color: #1e293b; font-size: 18px; font-weight: 700; margin: 6px 0 0 0;">{full_name}</p>
            </div>
            
            <div>
              <span style="color: #94a3b8; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Email Address</span>
              <p style="margin: 6px 0 0 0;">
                <a href="mailto:{user_email}" style="color: #2563eb; font-size: 16px; font-weight: 600; text-decoration: none;">{user_email}</a>
              </p>
            </div>
          </div>
          
          <div style="background-color: #fffbeb; border-radius: 12px; padding: 24px; border: 1px solid #fde68a;">
            <h3 style="color: #92400e; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 12px 0;">📝 Message</h3>
            <p style="color: #1e293b; line-height: 1.7; margin: 0; font-size: 15px; white-space: pre-wrap;">{message}</p>
          </div>
          
          <div style="margin-top: 24px; text-align: center;">
            <a href="mailto:{user_email}?subject=Re: Your message on my portfolio" style="display: inline-block; background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 600;">
              ↩️ Reply to {first_name}
            </a>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px dashed #e2e8f0; text-align: center;">
            <p style="color: #94a3b8; font-size: 11px; margin: 0;">
              This notification was sent from your Portfolio Contact System<br>
              Submitted on {timestamp}
            </p>
          </div>
        </div>
      </body>
    </html>
    """
    
    logger.info(f"📧 Sending ADMIN notification to {ADMIN_EMAIL}")
    return _send_email(
        to_email=ADMIN_EMAIL,
        subject=subject,
        html_content=html,
        reply_to=user_email  # So admin can reply directly to user
    )


def send_user_confirmation(first_name: str, last_name: str, user_email: str) -> bool:
    """
    EMAIL 2: Send confirmation to USER that their message was received
    
    - TO: user's email address
    - Purpose: Confirm message was received successfully
    """
    subject = "Message Sent Successfully to Akash Malviya"
    
    html = f"""
    <html>
      <body style="font-family: 'Segoe UI', Arial, sans-serif; padding: 20px; background-color: #f8fafc; margin: 0;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 40px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
          
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="display: inline-block; background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 12px 24px; border-radius: 50px; font-size: 12px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;">
              ✅ Message Sent Successfully
            </div>
          </div>
          
          <h2 style="color: #1e293b; margin-bottom: 24px; font-size: 24px; font-weight: 700; text-align: center;">
            Thank You for Reaching Out!
          </h2>
          
          <p style="color: #334155; line-height: 1.7; margin-bottom: 16px; font-size: 15px;">
            Hi <strong>{first_name}</strong>,
          </p>
          
          <p style="color: #334155; line-height: 1.7; margin-bottom: 16px; font-size: 15px;">
            Thank you for contacting me through my portfolio website. Your message has been <strong>successfully received</strong> and I appreciate you taking the time to reach out.
          </p>
          
          <div style="background-color: #f0fdf4; border-left: 4px solid #22c55e; padding: 16px 20px; border-radius: 0 8px 8px 0; margin: 24px 0;">
            <p style="color: #166534; font-size: 14px; margin: 0; font-weight: 500;">
              ⏰ I will review your message and respond within <strong>24 hours</strong>.
            </p>
          </div>
          
          <p style="color: #334155; line-height: 1.7; margin-bottom: 20px; font-size: 15px;">
            If your inquiry is urgent, feel free to reach out to me directly using the contact details below:
          </p>
          
          <div style="background-color: #f8fafc; border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid #e2e8f0;">
            <h3 style="color: #475569; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 20px 0;">📞 Contact Details</h3>
            
            <div style="margin-bottom: 16px;">
              <span style="color: #94a3b8; font-size: 11px; font-weight: 600; text-transform: uppercase;">Email</span>
              <p style="margin: 4px 0 0 0;">
                <a href="mailto:akashpasay567@gmail.com" style="color: #2563eb; font-size: 15px; font-weight: 600; text-decoration: none;">akashpasay567@gmail.com</a>
              </p>
            </div>
            
            <div style="margin-bottom: 16px;">
              <span style="color: #94a3b8; font-size: 11px; font-weight: 600; text-transform: uppercase;">Phone / WhatsApp</span>
              <p style="margin: 4px 0 0 0;">
                <a href="tel:+919753072646" style="color: #1e293b; font-size: 15px; font-weight: 600; text-decoration: none;">+91 97530 72646</a>
              </p>
            </div>
            
            <div>
              <span style="color: #94a3b8; font-size: 11px; font-weight: 600; text-transform: uppercase;">LinkedIn</span>
              <p style="margin: 4px 0 0 0;">
                <a href="https://www.linkedin.com/in/akash-malviya-47069216a" style="color: #2563eb; font-size: 15px; font-weight: 600; text-decoration: none;">akash-malviya</a>
              </p>
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 24px; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 14px; margin: 0 0 4px 0;">Best regards,</p>
            <p style="color: #1e293b; font-weight: 700; margin: 0 0 4px 0; font-size: 16px;">Akash Malviya</p>
            <p style="color: #64748b; font-size: 13px; margin: 0;">DevOps Engineer | Cloud Infrastructure Specialist</p>
          </div>
          
          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px dashed #e2e8f0; text-align: center;">
            <p style="color: #94a3b8; font-size: 11px; margin: 0;">
              This is an automated confirmation from Akash Malviya's Portfolio.
            </p>
          </div>
        </div>
      </body>
    </html>
    """
    
    logger.info(f"📧 Sending USER confirmation to {user_email}")
    return _send_email(
        to_email=user_email,
        subject=subject,
        html_content=html
    )
