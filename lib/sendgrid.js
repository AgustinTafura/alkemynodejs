const sgMail = require('@sendgrid/mail');

module.exports = {
    
    sendEmail: (to, subject, text) => {

        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to,
            from: 'agustintafura@hotmail.com', // Use the email address or domain you verified above
            subject,
            text,
            html: '<strong>WELCOME! REGISTER COMPLETE</strong>',
        };
    
        sgMail
        .send(msg)
        .then(() => {console.log('888 mail enviado')}, error => {
        console.error(error);
        if (error.response) {
            console.error(error.response.body)
        }
        });
    }
}