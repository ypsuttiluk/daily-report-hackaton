const request = require('request')
const firebase = require('firebase')
const database = require('./database')
const firebaseApp = database.firebaseApp

// const firebaseApp = firebase.initializeApp({
//   apiKey: "AIzaSyAPHQAAG6znTUbG6PL7Oiw2hwI50lrPtQY",
//   authDomain: "daily-report-14ce7.firebaseapp.com",
//   databaseURL: "https://daily-report-14ce7.firebaseio.com",
//   projectId: "daily-report-14ce7",
//   storageBucket: "daily-report-14ce7.appspot.com",
//   messagingSenderId: "545247969478"
// })

let headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer nhzcYNhPjdxEb5iD7i0qLk3ogT6jOHcqkchfrxZ5F4NfA2RWEDI0V7Uj3386cyYCQbNtWrlhCechWIUzP/NIdRlD7wKc41tz3iIhsZSZWxDFV/yvwcU3yJY3JRfHjt4YwXxDgBiPiUrdjLhWILrzaQdB04t89/1O/w1cDnyilFU='
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
  const team = await database.getTeamOfUser(uid)
  const hasInitialYesterday = await database.hasInitialYesterday(team, uid)
  if(!hasInitialYesterday) {
    const rootRef = firebaseApp.database().ref('teams')
    const time = database.createDateKey()
    const newMessageRef = rootRef
      .child(team)
      .child('reports')
      .child(time)
      .child(uid)
      .child('yesterday')
      .set(message.text)
    let body = JSON.stringify({
      replyToken: reply_token,
      messages: [{
          type: 'text',
          text: 'วันนี้ทำอะไร ?'
      }]
    })
    database.initialToday(team, uid)
    return request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode)
    })
  }

  const hasInitialToday = await database.hasInitialToday(team, uid)
  if(!hasInitialToday) {
    const rootRef = firebaseApp.database().ref('teams')
    const time = database.createDateKey()
    const newMessageRef = rootRef
      .child(team)
      .child('reports')
      .child(time)
      .child(uid)
      .child('today')
      .set(message.text)
    let body = JSON.stringify({
      replyToken: reply_token,
      messages: [{
          type: 'text',
          text: 'มีปัญหาอะไรไหม ?'
      }]
    })
    database.initialProblem(team, uid)
    return request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode)
    })
  }

  const hasInitialProblem = await database.hasInitialProblem(team, uid)
  if(!hasInitialProblem) {
    const rootRef = firebaseApp.database().ref('teams')
    const time = database.createDateKey()
    const newMessageRef = rootRef
      .child(team)
      .child('reports')
      .child(time)
      .child(uid)
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
      database.initialYesterday(team, uid)
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