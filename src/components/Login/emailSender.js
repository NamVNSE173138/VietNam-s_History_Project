// // server.js (or wherever your backend code resides)
// const express = require("express");
// const bodyParser = require("body-parser");
// const { sendEmail } = require("./emailSender.js"); // Update the path to emailSender.js accordingly

// const app = express();
// app.use(bodyParser.json());

// app.post("/api/send-email", async (req, res) => {
//   const { username, email } = req.body;

//   // Here, you can add any validation or processing logic before sending the email

//   const subject = "Password Reset Code";
//   const text = `Dear ${username},\n\nYour password reset code is XYZ123. Use this code to reset your password.`;

//   const emailSent = await sendEmail(email, subject, text);

//   if (emailSent) {
//     res.status(200).json({ success: true });
//   } else {
//     res.status(500).json({ success: false, error: "Failed to send email" });
//   }
// });

// const PORT = 3000; // Replace with the desired port number
// app.listen(PORT, () => {
//   console.log(`Server started on port ${PORT}`);
// });
const nodemailer = require("nodemailer");
// Import NodeMailer (after npm install)

async function main() {
  // Async function enables allows handling of promises with await

  // First, define send settings by creating a new transporter:
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // SMTP server address (usually mail.your-domain.com)
    port: 3000, // Port for SMTP (usually 465)
    secure: true, // Usually true if connecting to port 465
    auth: {
      user: "quanvase173045@fpt.edu.vn", // Your email address
      pass: "22122003", // Password (for gmail, your app password)
      // ⚠️ For better security, use environment variables set on the server for these values when deploying
    },
  });

  // Define and send message inside transporter.sendEmail() and await info about send from promise:
  let info = await transporter.sendMail({
    from: "quanvase173045@fpt.edu.vn",
    to: "qsao2212@gmail.com",
    subject: "Testing, testing, 123",
    html: `
    <h1>Hello there</h1>
    <p>Isn't NodeMailer useful?</p>
    `,
  });

  console.log(info.messageId); // Random ID generated after successful send (optional)
}

main().catch((err) => console.log(err));
