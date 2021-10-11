const sgMail = require('@sendgrid/mail');

module.exports = {
    
    sendEmail: async(to, subject, text) => {

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
        .then(() => {}, error => {
        console.error(error);
        if (error.response) {
            console.error(error.response.body)
        }
        });
    }
}