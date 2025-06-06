import 'dotenv/config';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendEmail(html) {
  try {
    const info = await transporter.sendMail({
      from: `"Notícias Tecnologia" <${process.env.EMAIL_USER}>`,
      to: 'laerciofernandesmelonetoo@gmail.com',
      subject: 'Notícias - Tecnologia',
      text: 'Veja as últimas notícias de tecnologia!',
      html: html,
    });

    console.log('E-mail enviado: %s', info.messageId);
  } catch (error) {
    console.error('Erro ao enviar o e-mail:', error);
  }
}