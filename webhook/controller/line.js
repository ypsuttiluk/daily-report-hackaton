const request = require('request')
const firebase = require('firebase')
const database = require('./database')
const firebaseApp = database.firebaseApp

let headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer EveOTG9Msy5GCAy9YIe18aLWzEm/1yVmOWZv/WIQF4JY6hM4vfl7x6vL5uqaU7EpQbNtWrlhCechWIUzP/NIdRlD7wKc41tz3iIhsZSZWxBluqFW1BR5uXtJvs/CjVvMiDkTCW3VF0uOKXPpq4VV4gdB04t89/1O/w1cDnyilFU='
}

const register = (reply_token, uid, name) => {
  const rootRef = firebaseApp.database().ref('users')
  const newMessageRef = rootRef.child(uid).set({uid: uid,name: name})
  const path = newMessageRef.toString()
  let body = JSON.stringify({
      replyToken: reply_token,
      messages: [{
          type: 'text',
          text: 'ขอบคุณค่ะ'
      }]
  })
  request.post({
      url: 'https://api.line.me/v2/bot/message/reply',
      headers: headers,
      body: body
  }, (err, res, body) => {
      console.log('status = ' + res.statusCode)
  })
}

const reply = async (reply_token, message, uid) => {
  const hasInitialYesterday = await database.hasInitialYesterday(uid)
  if(!hasInitialYesterday) {
    const rootRef = firebaseApp.database().ref('reports')
    const time = database.createDateKey()
    const newMessageRef = rootRef
      .child(uid)
      .child(time)
      .child('yesterday')
      .set(message.text)
    let body = JSON.stringify({
      replyToken: reply_token,
      messages: [{
          type: 'text',
          text: 'วันนี้ทำอะไร ?'
      }]
    })
    database.initialToday(uid)
    return request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode)
    })
  }

  const hasInitialToday = await database.hasInitialToday(uid)
  if(!hasInitialToday) {
    const rootRef = firebaseApp.database().ref('reports')
    const time = database.createDateKey()
    const newMessageRef = rootRef
      .child(uid)
      .child(time)
      .child('today')
      .set(message.text)
    let body = JSON.stringify({
      replyToken: reply_token,
      messages: [{
          type: 'text',
          text: 'มีปัญหาอะไรไหม ?'
      }]
    })
    database.initialProblem(uid)
    return request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode)
    })
  }

  const hasInitialProblem = await database.hasInitialProblem(uid)
  if(!hasInitialProblem) {
    const rootRef = firebaseApp.database().ref('reports')
    const time = database.createDateKey()
    const newMessageRef = rootRef
      .child(uid)
      .child(time)
      .child('problem')
      .set(message.text)
    let body = JSON.stringify({
      replyToken: reply_token,
      messages: [{
          type: 'text',
          text: 'ขอบคุณสำหรับการ daily วันนี้ค่ะ'
      }]
    })
    return request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode)
    })
  }
}

const pushMessage = (uid, message) => {
  let body = JSON.stringify({
      to: 'U62f179fca9d438151f38cca076f2eef2',
      messages: [{
          type: 'text',
          text: 'i love u'
      }]
  })
  request.post({
      url: 'https://api.line.me/v2/bot/message/push',
      headers: headers,
      body: body
  }, (err, res, body) => {
      console.log('err = ' + err)
      console.log('status = ' + res.statusCode)
      console.log('body : ', body)
  })
}

const dailyTime = async () => {
  const teams = await database.getTeams()
  for (let team in teams) {
    const members =  await database.getMemberInTeam(team)
    members.map((uid) => {
      database.initialYesterday(uid)
      let body = JSON.stringify({
        to: uid,
        messages: [
          {
            type: 'text',
            text: 'มา daily กัน'
          },
          {
            type: 'text',
            text: 'เมื่อวานทำอะไร ?'
        }]
      })
      request.post({
          url: 'https://api.line.me/v2/bot/message/push',
          headers: headers,
          body: body
      })
    })
  }
}

module.exports = {
  register,
  reply,
  pushMessage,
  dailyTime,
}