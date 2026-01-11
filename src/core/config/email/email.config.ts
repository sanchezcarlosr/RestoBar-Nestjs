import { HOST_MAIL, PASSWORD_APP, PORT_MAIL, SECURE, USER_REMITENTE } from "../environment";
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

const emailCredential = {
    host: HOST_MAIL,
    port: PORT_MAIL, //Mas usado, la diferrencia con el otro puerto el 465 es como inicia, en este caso inicia sin encriptar y luego se pasa a TLS, 465 se enccripta desde el principio
    secure: SECURE,
    auth: {
        user: USER_REMITENTE, // Email de materiaap
        pass: PASSWORD_APP, // Esto se generar desde la cuenta de google
    },
};

export const emailConfig = {
    transport: emailCredential, //Configuración del Emisor, internamente se crear un string con cada configuración
    defaults: {
        from: 'Birabar', //Le aparecera como remitente en la bandeja de correos
    },
    template: { //Configuración del motor de renderización ya se para Pug u otros
        dir: process.cwd() + '/src/modules/email/templates',//Indicamos al motor donde estan las plantillas, process.cwd() devuelve la ruta done se ejecuta la APP y comienza desde /home/carlos ... no es la ubicación de este archivo
        adapter: new PugAdapter(), //Le indicamos el motor de renderización a utilizar
        options: {
            strict: true //Con esta opción evitamos enviar correos que le falten variables del contexto
        }
    }
}