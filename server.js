const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 3000 })

wss.on('connection', ws => {
  console.log('有人进来了')

  ws.on('message', data => {
    ws.send(data + ':message')
  })

  ws.on('close', () => {
    console.log('有人离开了')
  })
})