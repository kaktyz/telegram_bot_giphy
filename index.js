// Подключаем библиотеку для работы с Telegram API в переменную
var TelegramBot = require('node-telegram-bot-api');

// Устанавливаем токен, который выдавал нам бот
var token = '1144440917:AAEBfc77q_c7-dH_4OjWcS9WuQmwoMrNl1o';

// Включить опрос сервера. Бот должен обращаться к серверу Telegram, чтобы получать актуальную информацию
// Подробнее: https://core.telegram.org/bots/api#getupdates
var bot = new TelegramBot(token, { polling: true });

let settings = {
    "api" : "https://api.giphy.com/v1/gifs/random?",
    "apiKey" : "api_key=ugaftL4Bbn7PRk8kzctvHsfVeSq4iNuM",
    "query" : "&tag="
};

/*
 * На вход передается ссылка
 * @param {url} link
 * на выход получаем URL гифки с API
 */
function getGif(link) {

        // Забираем данные с сылки
        const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        let xhr = new XMLHttpRequest();
        xhr.open("GET", link, false);
        xhr.send(null);
        
        // Парсим полученные данные с ссылки
        let res = JSON.parse(xhr.responseText);

        return res.data.images.original.url;
}

/**
 * Объяснение как работать с ботом при старте
 */
bot.onText(/\/strat/, function (msg) {
        
    const resp = "Привет!! Это я - бот для поиска Gif-картинок. Чтобы найти забавную гуфку напиши day плюс слово, по которому я найду тебе гифку. Попробуй например: day sun.";
    bot.sendMessage(msg.chat.id, resp);

  });

// Написать мне ... (/day Hello World! - пришлет сообщение с этим приветствием, то есть "Hello World!")
bot.onText(/day (.+)/i, function (msg, match) {
    
    var fromId = msg.chat.id; // ID отправителя
    let urlOfGif = encodeURI(settings.api + 
        settings.apiKey + 
        settings.query + 
        match[1]
        );
    
    let gif = getGif(urlOfGif);//vгифка полученная с API по нашему запросу

    bot.sendDocument(fromId, gif);

});