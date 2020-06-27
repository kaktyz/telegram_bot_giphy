const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const fs = require('fs')



const bot = new Telegraf("token");


bot.start((ctx) => ctx.reply('Привет, я бот для поиска GIF-ок, напиши любое слово, и я поищу что-то интересное специально для тебя.'));
bot.help((ctx) => ctx.reply('Пришли мне стикер'));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears('джейк', (ctx) => ctx.replyWithAnimation('https://99px.ru/sstorage/86/2017/07/image_86100717001237906221.gif'));


bot.launch()