var nodemailer = require('nodemailer');
module.exports = {
    mailer: (email, callback) => {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.E_NAME,
                pass: process.env.E_PASS
            }
        });

        var mailOptions = {
            from: process.env.E_NAME,
            to: email,
            subject: '"Hello ✔',
            text: 'To confirm your E-mail click  http://localhost:8903/user/registration/3'
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
                return callback(error);
            }
            return callback(null, true);
        });
    }
};