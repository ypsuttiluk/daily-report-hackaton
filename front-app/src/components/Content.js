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
// import SetTimeDaily from './SetTimeDaily'


const { Content } = Layout

class Contents extends Component {
  constructor() {
    super();
    this.state = {
      reports: [],
      date: '',
      membersKey: [],
      enabledSelectDate: false,
    }
  }

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
              <Report reports={this.state.reports} />
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
            {/* <Row>
              <Content className="content-team-layout">
              <SetTimeDaily />
              </Content>
            </Row> */}
          </Content>
        </Content>
      </Layout>
    );
  }
}

export default Contents;
