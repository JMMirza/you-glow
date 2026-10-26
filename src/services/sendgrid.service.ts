import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import { config } from 'src/config';

@Injectable()
export class SendGridService {
  async sendEmail(to: string, template: { SUBJECT?: string; HTML?: string }) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to,
      from: config.EMAIL,
      subject: template.SUBJECT,
      //  text: 'and easy to do anywhere, even with Node.js',
      html: template.HTML,
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent');
      })
      .catch((error) => {
        console.error(">>>>>>>>>>>>>>>",error.response.body);
      });
  }
}
