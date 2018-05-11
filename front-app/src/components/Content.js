import React, { Component } from 'react'
import firebase from 'firebase'
import { Layout } from 'antd'
import filter from 'lodash.filter'
import find from 'lodash.find'
import Sidebar from './Sidebar'
import Report from './Report'
import DatePicker from './DatePicker'

const { Content } = Layout

class Contents extends Component {
  constructor() {
    super();
    this.state = {
      reports: [
        {
          name: 'joe',
          message: {
            problem: 'ไม่มี',
            yesterday: 'ไม่มี',
            today: 'ไม่มี',
          },
        },
      ],
      date: '',
      membersKey: [],
      enabledSelectDate: false,
    }
  }

  // componentWillMount() {
  //   firebase.database().ref('/teams/').once('value')
  //   .then((response) => {
  //     // console.log(response.val()['shop-thinknet'].members)
  //     // console.log(response.val()['map-magic'].members)

  //     response.val()['shop-thinknet'].members.map((member) => {
  //       firebase.database().ref(`/users/${member}`).once('value')
  //       .then((res) => {
  //         this.setState({
  //           TNStore: {
  //             member: [
  //               ...this.state.TNStore.member,
  //               res.val(),
  //             ]
  //           }
  //         })

  //       })
  //     })
  //   })
    
  //   // firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
  //   //   var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
  //   //   // ...
  //   // });
  // }

  getReports = (users, teamName, membersKey) => {
    this.setState({
      reports: [],
      membersKey,
      enabledSelectDate: true,
    })
    const userInTeam = filter(users, (user => {
      return user.team === teamName
    }))
    userInTeam.map(user => {
      const data = find(membersKey, (member) => {
        return member.uid === user.uid
      })

      firebase.database().ref(`/reports/${user.uid}/${this.state.date}`).once('value')
      .then(response => {
        let reports = this.state.reports
        
        const report = {
          name: data.name,
          message: {
            ...Object.values(response.val())[0]
          },
        }

        reports.push(report)
        this.setState({
          reports,
        })
      })
      .catch(() => {
        this.setState({
          reports: [],
        })
      })
    })
  }

  setDate = (date) => {
    console.log(date)
    this.setState({
      date,
    })
  }

  render() {
    return (
        <Layout>
        <Content className="contentAll">
          <Layout className="contentLeft">
            <Sidebar getReports={this.getReports} />
            <Content className="contentRight" style={{ margin: '0 16px' }}>
              <div className="date-picker-right">
                <DatePicker
                  setDate={this.setDate}
                  disabled={!this.state.enabledSelectDate}
                />
              </div>
              <Report reports={this.state.reports}/>
            </Content>
          </Layout>
        </Content>
      </Layout>
    );
  }
}

export default Contents;
