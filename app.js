
const request = require('request');

let updateID;
let token='XXX'
const url = `https://api.telegram.org/bot${token}`;

let deleteMessage = ((chatId, messageId) => {
    console.log(` deleting:  ${chatId} and ${messageId}`);

    request({ url: (`${url}/deletemessage?chat_id=${chatId}&message_id=${messageId}`) }, (error, response) => {
        
        if(response) console.log(response.body);
    })
})

const runTime=()=>{
    request({ url: (`${url}/getupdates?offset=${updateID}`) }, (error, response) => {
        if(response){
            let data = JSON.parse(response.body);
        
        //Make it check for each message if a sticker and then call delete
        data.result.forEach((res) => {
          
            if(res.message.hasOwnProperty('sticker')){
                
                deleteMessage(res.message.chat["id"], res.message.message_id);
            }
                    
        })
        
        let last=data.result.length-1;
        
        updateID=data.result[last].update_id ;
        
        }
        
    })
}
init();
async function init(){
    while(true){
        
        await sleep(10000);
        runTime();
    }
    
    
 }
 function sleep(ms){
     return new Promise(resolve=>{
         setTimeout(resolve,ms);
     })
 }
 
