const { segment } = require("oicq")
const { bot } = require("./bot/index")

// hello world
bot.on("message", function (msg) {
	if (msg.raw_message === "hello")
		msg.reply("hello world", true) //改为false则不会引用
})