const Telegraf = require('telegraf')

const bot = new Telegraf("882893548:AAG4QhL3oJ0ybzIY7PbwKggch79V4wFyx0o");

bot.start((ctx) => ctx.reply('Привет, я бот для поиска GIF-ок, напиши любое слово, и я поищу что-то интересное специально для тебя.'));
bot.help((ctx) => ctx.reply('Пришли мне стикер'));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears('джейк', (ctx) => ctx.replyWithAnimation('https://99px.ru/sstorage/86/2017/07/image_86100717001237906221.gif'));
bot.hears('Слава', (ctx) => {return ctx.replyWithAnimation('https://i.gifer.com/OJOg.gif')});

let settings = {
    "api" : "https://api.giphy.com/v1/gifs/search?",
    "apiKey" : "api_key=ugaftL4Bbn7PRk8kzctvHsfVeSq4iNuM",
    "query" : "&q=",
    "limit" : "&limit=1",
    "language" : "&lang=en"
};

bot.use((ctx) => {

    let message = ctx.message.text;
    let urlOfGif =  settings.api + settings.apiKey + settings.query + message + settings.limit + settings.language;

    console.log("Текст " + message)
    console.log("урл " + urlOfGif)

    const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;  
    let xhr = new XMLHttpRequest();
    xhr.open("GET", urlOfGif, false);
    xhr.send(null);
    
    let res = JSON.parse(xhr.responseText);
    let gif = res.data[0].images.original.url;
    // let gif = res.data[0].images;

    return ctx.reply(`${gif}`)
    
})

/*

    https://api.giphy.com/v1/gifs/search?api_key=ugaftL4Bbn7PRk8kzctvHsfVeSq4iNuM&q=rainbow&limit=1&offset=0&rating=G&lang=en
    https://api.giphy.com/v1/gifs/search?api_key=ugaftL4Bbn7PRk8kzctvHsfVeSq4iNuM&q=love&limit=1&lang=en",

*/

bot.launch()