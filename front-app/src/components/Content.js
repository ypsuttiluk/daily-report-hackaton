import React, { Component } from 'react'
import firebase from 'firebase'
import { Layout, Row } from 'antd'
import filter from 'lodash.filter'
import find from 'lodash.find'
import Sidebar from './Sidebar'
import Addteam from './Addteam'
import Report from './Report'
import DatePicker from './DatePicker'
import ManageTeam from './ManageTeam'
import ManageUser from './ManageUser'

const { Content } = Layout


let today = new Date()
today = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`

class Contents extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      teamName: '',
      reports: [],
      date: today,
      membersKey: [],
      enabledSelectDate: false,
    }
  }

  getReports = (users, teamName, membersKey , date=this.state.date) => {
    this.setState({
      users,
      teamName,
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
      console.log('date : ', date)
      firebase.database().ref(`/reports/${user.uid}/${date}`).once('value')
      .then(response => {
        let reports = this.state.reports
        
        console.log('sponse.val() : ',response.val())
        const report = {
          name: data.name,
          message: response.val(),
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
    this.setState({
      date,
    })

    const {users, teamName, membersKey} = this.state
    this.getReports(users, teamName, membersKey, date)
  }

  render() {
    console.log('reports ->>>>>',this.state.reports)
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
          <Content>
            <Row>
              <Content className="content-team-layout">
                < ManageTeam />
              </Content>
            </Row>
            <Row>
              <Content className="content-team-layout">
                <ManageUser />
              </Content>
            </Row>
          </Content>
        </Content>
      </Layout>
    );
  }
}

export default Contents;
