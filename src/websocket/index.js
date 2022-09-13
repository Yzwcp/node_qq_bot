var ws = require("nodejs-websocket");
const { wsCallback } = require('../bot/index')
// const { onWsText } = require('./allEvent')
var server = ws.createServer(wsCallback)
module.exports = server
