const fs = require('fs');
const qrcode = require('qrcode-terminal');

const { Client } = require('whatsapp-web.js');



const SESSION_FILE_PATH = "./session.js";

const country_code = "595";
const number = "984708142";
const msg = "Buen dia";

let sessionData;
if(fs.existsSync(SESSION_FILE_PATH)){ 
    sessionData = require( SESSION_FILE_PATH );
} 

const client = new Client({
    session:sessionData,
});

client.initialize();

client.on('qr', qr=> {
    qrcode.generate(qr, {small: true});
} )

client.on('ready',()=> {
    console.log(' El cliente esta listo');
    let chatId = country_code + number + "@c.us";

    client.sendMessage(chatId, msg)
            .then(response => {
                if(response.id.fromMe){
                    console.log(' El mensaje fue enviado');
                }
            })
})

client.on('authenticated', session =>{
    sessionData = session;

    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), err => {
        if(err){
            console.log('Error en autenticacion')
            console.error(err);
        }
    })
})

client.on('auth_failure',msg => {
    console.error('Hubo un fallo en la autenticacion', msg);
})


