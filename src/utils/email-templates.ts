export const verifyEmail = (name: string, otp: string) => {
  return {
    SUBJECT: `YouGlow - Verify Your email by OTP`,
    HTML: `
        <html>
        <head>
            <meta charset="utf-8">
            <title>YouGlow - Verify Your email by OTP</title>
        </head>
        <body>
            <p>Dear ${name},</p>
            <p>Thank you for becoming a member of our team! We're excited to have you on board.</p>
            <p>Your OTP is <strong>${otp}</strong>.
            Verify Your email by OTP.</p>
            <p>If you have any questions or feedback, please feel free to contact us at <strong>management@youglow.com</strong>.</p>
            <p>Best regards,</p>
            <p>The YouGlow Team</p>
        </body>
        </html>
        `,
  };
};

export const setNewPassword = (name: string, url: string) => {
  return {
    SUBJECT: `YouGlow - Set Your Password`,
    HTML: `
        <html>
        <head>
            <meta charset="utf-8">
            <title>YouGlow - Set Your Password</title>
        </head>
        <body>
            <p>Dear ${name},</p>
            <p>Thank you for becoming a member of our team! We're excited to have you on board.</p>
            <p>To set your password please click <strong><a href=${url} target="_blank">here</a></strong></p>
            <p>If you have any questions or feedback, please feel free to contact us at <strong>management@youglow.com</strong>.</p>
            <p>Best regards,</p>
            <p>The YouGlow Team</p>
        </body>
        </html>
        `,
  };
};

export const superAdminOTP = (name: string, otp: string) => {
  return {
    SUBJECT: `Your OTP for Super Admin Access`,
    HTML: `
      <html>
      <head>
          <meta charset="utf-8">
          <title>Super Admin OTP</title>
      </head>
      <body>
          <p>Dear Super Admin,</p>
          <p>Here is your One-Time Password (OTP) for accessing the Super Admin panel:</p>
          <p><strong>${otp}</strong></p>
          <p>This OTP is valid for a single use and should not be shared with anyone. Please use it to securely access your Super Admin account.</p>
          <p>If you encounter any issues or have questions, don't hesitate to reach out to us at <strong>management@youglow.com</strong>.</p>
          <p>Thank you for your continued support and dedication to our platform.</p>
          <p>Best regards,</p>
          <p>The YouGlow Team</p>
      </body>
      </html>
      `,
  };
};

export const newClientEmail = (name: string, url: string) => {
  return {
    SUBJECT: `Welcome to Our Platform - Set Your Password`,
    HTML: `
        <html>
        <head>
            <meta charset="utf-8">
            <title>Welcome to Our Platform</title>
        </head>
        <body>
            <p>Dear ${name},</p>
            <p>We're thrilled to welcome you as our new tenant on our platform. As part of the onboarding process, you'll need to set up your account password.</p>
            <p>To set your password, please click <strong><a href=${url} target="_blank">here</a></strong>.</p>
            <p>If you encounter any issues or have questions, don't hesitate to reach out to us at <strong>management@youglow.com</strong>.</p>
            <p>We're excited to have you onboard and look forward to a fruitful partnership!</p>
            <p>Warm regards,</p>
            <p>The YouGlow Team</p>
        </body>
        </html>
        `,
  };
};

export const verifyNewEmail = (name: string, url: string) => {
  return {
    SUBJECT: `YouGlow - Verify Your email`,
    HTML: `
        <html>
        <head>
            <meta charset="utf-8">
            <title>YouGlow - Verify Your email</title>
        </head>
        <body>
            <p>Dear ${name},</p>
            <p>Thank you for becoming a member of our team! We're excited to have you on board.</p>
            <p>To verify your email please click <strong><a href=${url} target="_blank">here</a></strong></p>
            <p>If you have any questions or feedback, please feel free to contact us at <strong>management@youglow.com</strong>.</p>
            <p>Best regards,</p>
            <p>The YouGlow Team</p>
        </body>
        </html>
        `,
  };
};

export const forgotPassword = (name: string, otp: string) => {
  return {
    SUBJECT: `YouGlow - Forgot Password`,
    HTML: `
        <html>
        <head>
            <meta charset="utf-8">
            <title>YouGlow - Forgot Password</title>
        </head>
        <body>
            <p>Dear ${name},</p>
            <p>Your OTP is <strong>${otp}</strong>.
            <p>If you have any questions or feedback, please feel free to contact us at <strong>management@youglow.com</strong>.</p>
            <p>Best regards,</p>
            <p>The YouGlow Team</p>
        </body>
        </html>
        `,
  };
};

export const roleAssigned = (name: string, role: string) => {
  return {
    SUBJECT: `YouGlow - Role Assigned (${role})`,
    HTML: `
        <html>
        <head>
            <meta charset="utf-8">
            <title>YouGlow - Role Assigned (${role})</title>
        </head>
        <body>
            <p>Dear ${name},</p>
            <p>Thank you for becoming a member of our team! We're excited to have you on board.</p>
            <p><strong>Role has been assigned to You.</strong>.</p>
            <p>You can able to login and use the YouGlow services.</p>
            <p>If you have any questions or feedback, please feel free to contact us at <strong>management@youglow.com</strong>.</p>
            <p>Best regards,</p>
            <p>The YouGlow Team</p>
        </body>
        </html>
        `,
  };
};

export const accountVerified = (name: string) => {
  return {
    SUBJECT: `YouGlow - Account Verified`,
    HTML: `
        <html>
        <head>
            <meta charset="utf-8">
            <title>YouGlow - Account Verified</title>
        </head>
        <body>
            <p>Dear ${name},</p>
            <p>Thank you for becoming a member of our team! We're excited to have you on board.</p>
            <p><strong>Your account has been verified.</strong>.</p>
            <p>Right now, You can't be able to login. Once Your role has been setted up from Higher management. Then You
            will able to use YouGlow</p>
            <p>If you have any questions or feedback, please feel free to contact us at <strong>management@youglow.com</strong>.</p>
            <p>Best regards,</p>
            <p>The YouGlow Team</p>
        </body>
        </html>
        `,
  };
};

export const resetPinCode = (name: string, otp: number) => {
  return {
    SUBJECT: `YouGlow - Reset Pin Code`,
    HTML: `
        <html>
        <head>
            <meta charset="utf-8">
            <title>YouGlow - Reset Pin Code</title>
        </head>
        <body>
            <p>Dear ${name},</p>
            <p>Your OTP is <strong>${otp}</strong>.
            <p>If you have any questions or feedback, please feel free to contact us at <strong>management@youglow.com</strong>.</p>
            <p>Best regards,</p>
            <p>The YouGlow Team</p>
        </body>
        </html>
        `,
  };
};
