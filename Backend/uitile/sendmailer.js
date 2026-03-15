const nodemailer = require("nodemailer");

const sendMail = async (FullName, Email) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: Email,
      subject: "Thank you for contacting us - MyNoteBook",
      html: `
        <h2>Hello ${FullName},</h2>
        <p>Thank you for contacting us.</p>
        <p>We have received your message successfully.</p>
        <br/>
        <p>Regards,<br/>MyNoteBook Team</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent successfully:", info.response);
  } catch (error) {
    console.log("Email not sent ");
    console.log(error.message);
  }
};

module.exports = sendMail;
