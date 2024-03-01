const mailgun = require("mailgun-js");

// Initialize Mailgun
const mg = mailgun({
    apiKey: process.env.apiKey,
    domain: process.env.domain,
});


// Compose email
const data = {
    from: "dhruvpatel2034@gmail.com",
    to: "Dhruv Patel <dhruv20345@gmail.com>",
    subject: "Hello Dhruv Patel",
    text: "Congratulations Dhruv Patel, you just sent an email with Mailgun! You are truly awesome!",
};


// Send email
mg.messages().send(data, function (error, body) {
    if (error) {
        console.error(error);
    } else {
        console.log(body);
    }
});
