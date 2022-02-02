const nodemailer = require("nodemailer");

// SET Email Opts

const emailId = 'saad.afzaal7777777@gmail.com';

let opts = {
  service: 'Gmail',
  auth: {
      user: emailId,
      pass: 'sa20182018'
  }
}

let transporter = nodemailer.createTransport(opts);

module.exports = { 
  sendMail: async (options, done) => {
    transporter.sendMail({
      from: emailId,
      to: options.email,
      subject: options.subject,
      html: options.message 
      // attachments: options.attachments
    }, (err, info) => {
      if (err) {
        return done(err);
      }

      console.log("Message sent: %s", info.messageId);
      return done();
    });
  }
};