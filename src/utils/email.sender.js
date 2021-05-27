const nodemailer = require('nodemailer')
const fs = require('fs')
const path = require('path')
const ejs = require('ejs')


class EmailSender {

    _transporter = null;
    _receiverEmail = '';
    _subject = '';
    _mailSenderEmail = process.env.MAIL_SENDER_EMAIL;
    _mailSenderName = process.env.MAIL_SENDER_NAME;


    constructor() {
        this._setUp();
    }


    _setUp(){
        this._transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
            }
        });
    }

    setSubject(subject){
        this._subject = subject;

        return this;
    }

    setReceiver(receiver){
        this._receiverEmail = receiver
        return this
    }

    setSenderEmail(sender){
        this._mailSenderEmail = sender;
        return this
    }

    setEmailSenderName(senderName){
        this._mailSenderName = senderName;
        return this;
    }

    /**
     * Sends an HTML email
     * @param view
     * @param data
     * @param useTemplate
     * @returns {*}
     */
    sendHtml(view, data){



        return  new Promise((resolve, reject) =>{


            let fileName = path.join(__dirname,'../helpers/emails/'+view+'.ejs');

            let ejsOptions = {

            }


            ejs.renderFile(fileName, data, ejsOptions, (err, emailHtml) => {

                if(err){
                    return reject(err)
                }


                let emailOptions =  {
                    from: `${this._mailSenderName} <${this._mailSenderEmail}>`,
                    to: this._receiverEmail,
                    subject: this._subject,
                    html: emailHtml
                }

                this._transporter
                    .sendMail(emailOptions)
                    .then((res) => {
                        console.log(res)
                        resolve(true)
                    }).catch((e) => {
                    console.log(e)
                    resolve(false)
                })

            });


        } )
    }


    sendPlainTextEmail(text){
        let emailOptions =  {
            from: this.mailSender,
            to: this._receiverEmail,
            subject: this._subject,
            text: text
        };

        return  this._transporter
            .sendMail(emailOptions);
    }
}

module.exports = EmailSender