const request = require('request')
const firebase = require('firebase')

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAPHQAAG6znTUbG6PL7Oiw2hwI50lrPtQY",
  authDomain: "daily-report-14ce7.firebaseapp.com",
  databaseURL: "https://daily-report-14ce7.firebaseio.com",
  projectId: "daily-report-14ce7",
  storageBucket: "daily-report-14ce7.appspot.com",
  messagingSenderId: "545247969478"
})

const createDateKey = () => {
  const today = new Date()
  const dd = today.getDate()
  const mm = today.getMonth()+1 //January is 0!
  const yyyy = today.getFullYear()
  const newToday = `${dd}-${mm}-${yyyy}`
  return newToday
}

const getTeamOfUser = (uid) => {
  const rootRef = firebaseApp.database().ref('users')
    .child(uid)
  const dataPromist = new Promise((resolve) => {
    rootRef.once('value', (snapshot) => {
      resolve(snapshot.val().team)
    })
  })
  return dataPromist
}

const getMemberInTeam = (team) => {
  const rootRef = firebaseApp.database().ref('teams')
  const dataPromist = new Promise((resolve) => {
    rootRef.child(team).once('value', (snapshot) => {
      resolve(snapshot.val().members)
    })
  })
  return dataPromist
}

const getTeams = (team) => {
  const rootRef = firebaseApp.database().ref('teams')
  const dataPromist = new Promise((resolve) => {
    rootRef.once('value', (snapshot) => {
      resolve(snapshot.val())
    })
  })
  return dataPromist
}

const initialYesterday = async (team, memberUid) => {
  const time = createDateKey()
  const rootRef = firebaseApp.database().ref('teams')
  const newMessageRef = rootRef
    .child(team)
    .child('reports')
    .child(time)
    .child(memberUid)
    .child('yesterday')
    .set('null')
  newMessageRef.toString()
}

const initialToday = (team, memberUid) => {
  const time = createDateKey()
  const rootRef = firebaseApp.database().ref('teams')
  const newMessageRef = rootRef
    .child(team)
    .child('reports')
    .child(time)
    .child(memberUid)
    .child('today')
    .set('null')
  newMessageRef.toString()
}

const initialProblem = (team, memberUid) => {
  const time = createDateKey()
  const rootRef = firebaseApp.database().ref('teams')
  const newMessageRef = rootRef
    .child(team)
    .child('reports')
    .child(time)
    .child(memberUid)
    .child('problem')
    .set('null')
  newMessageRef.toString()
}

const hasInitialYesterday = (team, memberUid) => {
  const time = createDateKey()
  const rootRef = firebaseApp.database().ref('teams')
    .child(team)
    .child('reports')
    .child(time)
    .child(memberUid)
  const dataPromist = new Promise((resolve) => {
    rootRef.once('value', (snapshot) => {
      resolve(snapshot.val().yesterday === 'null'? false : true)
    })
  })
  return dataPromist
}

const hasInitialToday = (team, memberUid) => {
  const time = createDateKey()
  const rootRef = firebaseApp.database().ref('teams')
    .child(team)
    .child('reports')
    .child(time)
    .child(memberUid)
  const dataPromist = new Promise((resolve) => {
    rootRef.once('value', (snapshot) => {
      resolve(snapshot.val().today === 'null'? false : true)
    })
  })
  return dataPromist
}

const hasInitialProblem = (team, memberUid) => {
  const time = createDateKey()
  const rootRef = firebaseApp.database().ref('teams')
    .child(team)
    .child('reports')
    .child(time)
    .child(memberUid)
  const dataPromist = new Promise((resolve) => {
    rootRef.once('value', (snapshot) => {
      resolve(snapshot.val().problem === 'null'? false : true)
    })
  })
  return dataPromist
}

module.exports = {
  firebaseApp,
  createDateKey,
  getMemberInTeam,
  getTeamOfUser,
  getTeams,
  initialYesterday,
  initialToday,
  initialProblem,
  hasInitialYesterday,
  hasInitialToday,
  hasInitialProblem,
}