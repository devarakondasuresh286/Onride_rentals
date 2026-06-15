import logging
import smtplib
from email.message import EmailMessage
from email.utils import formataddr

from app.core.config import settings


logger = logging.getLogger(__name__)


def send_notification_email(to_email: str, subject: str, message: str) -> bool:
    """Send a plain-text notification email via SMTP."""
    if not all([settings.SMTP_SERVER, settings.SMTP_USERNAME, settings.SMTP_PASSWORD]):
        logger.warning("SMTP settings are incomplete; skipping notification email for %s", to_email)
        return False

    from_email = settings.SMTP_FROM_EMAIL or settings.SMTP_USERNAME
    email_message = EmailMessage()
    email_message["Subject"] = f"{settings.PROJECT_NAME}: {subject}"
    email_message["From"] = formataddr((settings.SMTP_FROM_NAME, from_email))
    email_message["To"] = to_email
    email_message.set_content(
        f"{subject}\n\n{message}\n\n--\n{settings.PROJECT_NAME}"
    )

    try:
        with smtplib.SMTP(settings.SMTP_SERVER, settings.SMTP_PORT, timeout=settings.SMTP_TIMEOUT_SECONDS) as server:
            if settings.SMTP_USE_TLS:
                server.starttls()
            server.login(settings.SMTP_USERNAME, settings.SMTP_PASSWORD)
            server.send_message(email_message)
        return True
    except smtplib.SMTPAuthenticationError:
        logger.error(
            "SMTP authentication failed for %s. If this is Gmail, use a Google App Password and keep 2-Step Verification enabled.",
            settings.SMTP_USERNAME,
        )
        return False
    except Exception:
        logger.exception("Failed to send notification email to %s", to_email)
        return False