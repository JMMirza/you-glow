const sgMail = require('@sendgrid/mail');
import { config } from '../config';
sgMail.setApiKey(config.SENDGRID_API_KEY);

export const email = async (
  to: string,
  template: { SUBJECT?: string; HTML?: string },
) => {
  const msg = {
    to,
    from: config.SENDGRID_EMAIL,
    subject: template?.SUBJECT,
    html: template?.HTML,
  };

  const maxAttempts = 3;
  const delayBetweenRetries = 1000; // 1 second

  let attempts = 0;
  let emailSent = false;

  while (attempts < maxAttempts && !emailSent) {
    try {
      await sgMail.send(msg);
      console.log('Email sent successfully');
      emailSent = true;
    } catch (error) {
      console.error('Error sending email:', error);
      attempts++;
      await new Promise((resolve) => setTimeout(resolve, delayBetweenRetries));
    }
  }

  if (!emailSent) {
    console.error('Failed to send email after multiple attempts');
  }

  return msg;
};
