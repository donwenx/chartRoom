const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 3000 })

const user = [] // 用户组
let nextUserId = 1 // 下一个id
const sendAll = (message) => {
  // 给每个用户发送一下消息
  user.forEach(item => item.ws.send(JSON.stringify(message)))
}
wss.on('connection', ws => {
  // 每次进来一个用户，就把下一个id赋值给它
  const userId = nextUserId
  const userInfo = {
    id: userId,
    name: (userId % 2 !== 0 ? '汤姆' : '杰克') + userId,
    avatar: `avatar/0${(userId % 2) + 1}.png`,
    ws,
  }

  console.log(userId, '进来了')
  nextUserId += 1 // 自增id
  user.push(userInfo) // 将新的用户保存到用户组中

  // 发送最新进来的人，在线人数
  sendAll({
    type: 'userList',
    userId,
    userCount: user.length,
    userList: user.map(item => {
      const { ws, ...data } = item
      return data
    }),
  })

  // 给自己发送一个消息，告知客户端身份
  ws.send(JSON.stringify({
    type: 'user',
    userInfo: {
      id: userInfo.id,
      name: userInfo.name,
      avatar: userInfo.avatar,
    },
  }))

  // 接收来自客户端的消息
  ws.on('message', data => {
    const res = {
      id: userId,
      type: 'message',
      data: JSON.parse(data),
    }
    // 设置一个给所有用户发送一下最最新消息
    sendAll(res)
  })

  ws.on('close', () => {
    console.log(userId, '离开了')
    // 用户离开了，需要删除属于他的聊天内容
    user.splice(user.findIndex((item) => item.id === userId), 1)
    // 有人离开，发送用户列表通知
    sendAll({
      type: 'userList',
      userId,
      userCount: user.length,
      userList: user.map(item => {
        const { ws, ...data } = item
        return data
      }),
    })
  })
})