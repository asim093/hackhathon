async function sendMail({ email = [], subject = "", htmlTemplate = "" }) {
    try {
      const info = await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email.join(", "), 
        subject,
        html: htmlTemplate,
      });
  
      console.log("Email Sent Successfully:", info.messageId);
      return info;
    } catch (error) {
      console.error("Email Sending Failed:", error.message);
      throw new Error("Failed to send email");
    }
  }
  
  export default sendMail;
  