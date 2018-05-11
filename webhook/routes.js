const express = require('express')
const lineController = require('./controller/line')
const router = express.Router()

router.post('/webhook', (req, res) => {
  let reply_token = req.body.events[0].replyToken
  const message = req.body.events[0].message.text
  const type = message.split(" ")[0]
  const name = typeof message.split(" ")[1] === 'undefined' ? null : message.split(" ")[1]
  if(type === 'register') {
    lineController.register(reply_token, req.body.events[0].source.userId, name)
    return res.sendStatus(200)
  }
  lineController.reply(reply_token, req.body.events[0].message, req.body.events[0].source.userId)
  return res.sendStatus(200)
})
router.get('/daily/time', (req, res) => {
  lineController.dailyTime()
  return res.sendStatus(200)
})
router.post('/push/message', (req, res) => {
  lineController.pushMessage()
  res.sendStatus(200)
})

module.exports = router