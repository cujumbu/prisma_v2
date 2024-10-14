import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'noreply@reverie.dk',
    pass: 'cyBw2sevXQCW$X82'
  }
});

export const sendStatusUpdateEmail = async (to: string, claimNumber: string, newStatus: string) => {
  try {
    await transporter.sendMail({
      from: '"Warranty Claims" <noreply@reverie.dk>',
      to: to,
      subject: `Warranty Claim #${claimNumber} Status Update`,
      text: `Your warranty claim #${claimNumber} has been updated. New status: ${newStatus}`,
      html: `<p>Your warranty claim #${claimNumber} has been updated.</p><p>New status: <strong>${newStatus}</strong></p>`
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};