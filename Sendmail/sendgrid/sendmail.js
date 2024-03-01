const sgMail = require("@sendgrid/mail");
sgMail.setApiKey("your-sendgrid-api-key");

// Compose email
const msg = {
  to: "recipient@example.com",
  from: "sender@example.com",
  subject: "Sending with SendGrid is Fun",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>",
};

// Send email
sgMail
  .send(msg)
  .then(() => console.log("Email sent successfully"))
  .catch((error) => console.error(error.toString()));
