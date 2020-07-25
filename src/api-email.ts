//import {nodemailer} from 'nodemailer';

declare let require;
const nodemailer = require('nodemailer');

const HOST: string = 'email-smtp.us-east-1.amazonaws.com';
const USERNAME: string = 'AKIARCZQKW72A4A6NMYO';
const PASSWORD: string = 'BLthMRnY6mibVJTPJYvOo0e3CqiVjloROTrv+2mhrI1G';
const FROM: string = 'no-reply@estabilisservices.com';


export class ApiEmail {
    /**
     * Envia token de confirmação de email para usuário
     *
     * Envia email com token de confirmação de conta
     * Email.send(email, password, Security.createTokenCheckEmail(email));
     *
     * @param email
     * @param password
     * @param token
     * @private
     */
    //TODO:: Implementar configuração de servidor de email via váriavel de ambiente
    public static send(email: string, password: string, token: string) {
        try {
            const transporter = nodemailer.createTransport({
                host: HOST,
                port: 465,
                secureConnection: true, // true for 465, false for other ports
                secure: true, // true for 465, false for other ports
                auth: {
                    user: USERNAME,
                    pass: PASSWORD
                }
            });

            const mailOptions: any = {
                from: FROM,
                to: email,
                subject: 'E-mail Verificação de conta!',
            };

            if (password) {
                mailOptions.html = '<b>Verifica conta</b>, <br> password: ' + password +
                        '<br><a href=\'http://localhost:4000/account/validation?token=' + token + '\'> acesse o link</a>' // html body;
            } else {
                mailOptions.html = '<b>Token de verificação da conta, <br><a href=\'http://localhost:4000/account/validation?token=' +
                        token + '\'> acesse o link</a>' // html body;
            }

//account/validate?returnUrl=/account/authorize/callback?client_id=54s5df5s4df5sdf54&redirect_uri=
// http://localhost:4200/account/login&response_type=token&scope=profile email apiportal&nonce=6578314676703391562078952356&state=15620196243110.004915540773385851

            transporter.sendMail(mailOptions, (error, info) => {
                console.log('AAAAAAAAAAAAAAAAAAAAAAAA');
                if (error) {
                    console.log('ERROR', error);
                } else {
                    console.log('SUCCESS', 'Email enviado: ' + info.response);
                }
            });
        } catch (e) {
            console.log('ERROR', e);
        }
    }

    /**
     * Envia email com token de redefinição de senha
     * Email.resetPassword(email, Security.createTokenCheckEmail(email));
     *
     * @param email
     * @param token
     */
    public static resetPassword(email: string, token: string) {

        try {
            const transporter = nodemailer.createTransport({
                host: HOST,
                port: 465,
                secureConnection: true, // true for 465, false for other ports
                secure: true, // true for 465, false for other ports
                auth: {
                    user: USERNAME,
                    pass: PASSWORD
                }
            });

            const mailOptions = {
                from: FROM,
                to: email,
                subject: 'Reset Password!',
                html: '<b>Reset Password</b>, <br> : <br><a href=\'http://localhost:4000/account/reset-password?token=' + token + '\'> Defina nova senha</a>'
            };

//account/validate?returnUrl=/account/authorize/callback?client_id=54s5df5s4df5sdf54&redirect_uri=
// http://localhost:4200/account/login&response_type=token&scope=profile email apiportal&nonce=6578314676703391562078952356&state=15620196243110.004915540773385851

            transporter.sendMail(mailOptions, (error, info) => {
                console.log('AAAAAAAAAAAAAAAAAAAAAAAA');
                if (error) {
                    console.log('ERROR', error);
                } else {
                    console.log('SUCCESS', 'Email enviado: ' + info.response);
                }
            });
        } catch (e) {
            console.log('ERROR', e);
        }
    }
}
