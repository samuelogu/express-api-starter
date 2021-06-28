const apiKey = process.env.MAILGUN_API_KEY
const email = process.env.MAIL_SENDER_EMAIL
const name = process.env.MAIL_SENDER_NAME
const domain = process.env.MAIL_SENDER_DOMAIN
const mailgun = require('mailgun-js')({apiKey, domain});
const from = `${name} <${email}>`

class MailService {

  static async send(to, subject, html) {

    const data = {
      from, to, subject, html
    };

    await mailgun.messages().send(data, (error, body) => {
      if (error) {
        return error
      }
      return body
    });

  }

}

module.exports = MailService
