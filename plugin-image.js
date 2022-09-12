const { segment } = require("oicq")
const { bot } = require("./bot/index")


const message = [
	"test 机器人自动发送",
	segment.image(["https://vkceyugu.cdn.bspapp.com/VKCEYUGU-180418df-0c01-4d88-b075-eec3cf0b0ca2/c94480c9-b22b-4202-bc7f-6b772e67a638.png", 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-180418df-0c01-4d88-b075-eec3cf0b0ca2/c94480c9-b22b-4202-bc7f-6b772e67a638.png']),
	segment.face(104),
	segment.at(10001),
]
// 回复图片
bot.on("message", function (msg) {
	if (msg.raw_message === "image")
		msg.reply(segment.image("https://vkceyugu.cdn.bspapp.com/VKCEYUGU-180418df-0c01-4d88-b075-eec3cf0b0ca2/c94480c9-b22b-4202-bc7f-6b772e67a638.png"))
})

// 回复表情
bot.on("message", function (msg) {
	if (msg.raw_message === "face")
		msg.reply([
			segment.face(101),
			segment.face(102),
			"\ntwo faces"
		])
})
bot.on("message.group", function (msg) {
	console.log(msg);
	if (msg.raw_message == "w")
		msg.reply(message)
})
// bot.sendGroupMsg(190343950,message)
// bot.sendGroupMsg(817964829,message)

