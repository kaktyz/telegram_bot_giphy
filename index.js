const Telegraf = require('telegraf')
const giphy = require('giphy-api')('ugaftL4Bbn7PRk8kzctvHsfVeSq4iNuM');
// const bot = new Telegraf("1144440917:AAEBfc77q_c7-dH_4OjWcS9WuQmwoMrNl1o");
const bot = new Telegraf("882893548:AAG4QhL3oJ0ybzIY7PbwKggch79V4wFyx0o");


bot.start((ctx) => ctx.reply('Привет, я бот для поиска GIF-ок, напиши любое слово, и я поищу что-то интересное специально для тебя.'));
bot.help((ctx) => ctx.reply('Напиши слово и я найду прикольную гифку для тебя'));
bot.hears('Слава', (ctx) => {return ctx.replyWithAnimation('https://i.gifer.com/OJOg.gif')});

let settings = {
    "api" : "https://api.giphy.com/v1/gifs/search?",
    "apiKey" : "api_key=ugaftL4Bbn7PRk8kzctvHsfVeSq4iNuM",
    "query" : "&q=",
    "limit" : "&limit=10",
    "rating" : "&rating=G",
    "language" : "&lang=en"
};

bot.use((ctx) => {

    let message = ctx.message.text;
    let urlOfGif =  settings.api + settings.apiKey + settings.query + message + settings.limit + settings.rating + settings.language;

    console.log("Текст " + message)
    console.log("урл " + urlOfGif)

    const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;  
    let xhr = new XMLHttpRequest();
    xhr.open("GET", urlOfGif, false);
    xhr.send(null);
    
    let res = JSON.parse(xhr.responseText);

    let rand = Math.floor(Math.random() * 10);
    let gif = res.data[rand].images.original.url;
/**
 * TODO: изменить приходящую кодировку на UTF8
 */
    // const encodedGif = encodeURI(gif);
    // return ctx.replyWithAnimation(`${encodedGif}`)

    return ctx.replyWithAnimation(`${gif}`)
    
})

// bot.use((ctx) => {

//     let message = ctx.message.text;
    
//     giphy.random(message).then(function (res) {

//             console.log(res);
// /**
//  * TODO: возвращает не JSON, разобраться
//  */
//             let result = JSON.parse(res.responseText)
//             return ctx.replyWithAnimation(`${result.data.images.original}`)
      
//     });
    
// })

/*

    https://api.giphy.com/v1/gifs/search?api_key=ugaftL4Bbn7PRk8kzctvHsfVeSq4iNuM&q=rainbow&limit=1&offset=0&rating=G&lang=en
    https://api.giphy.com/v1/gifs/search?api_key=ugaftL4Bbn7PRk8kzctvHsfVeSq4iNuM&q=love&limit=1&lang=en",

*/

bot.launch()