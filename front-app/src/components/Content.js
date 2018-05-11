import React, { Component } from 'react'
import firebase from 'firebase'
import { Layout, Row } from 'antd'
import Sidebar from './Sidebar'
import Addteam from './Addteam';
import Report from './Report'
import DatePicker from './DatePicker'
import ManageTeam from './ManageTeam'
import ManageUser from './ManageUser'

const { Content } = Layout

class Contents extends Component {
  constructor() {
    super();
    this.state = {
      TNStore: {
        member: [],
      },
      MapMagic: {
        member: [],
      },
      name: '',
      message: {
        yesterday: '',
        today: '',
        problem: '',
      }
    }
  }

  componentWillMount() {
    firebase.database().ref('/teams/').once('value')
      .then((response) => {
        // console.log(response.val()['shop-thinknet'].members)
        // console.log(response.val()['map-magic'].members)

        response.val()['shop-thinknet'].members.map((member) => {
          firebase.database().ref(`/users/${member}`).once('value')
            .then((res) => {
              this.setState({
                TNStore: {
                  member: [
                    ...this.state.TNStore.member,
                    res.val(),
                  ]
                }
              })

            })
        })
      })

    // firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
    //   var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
    //   // ...
    // });
  }

  setUserID = (userID) => {
    firebase.database().ref(`/users/${userID}`).once('value')
      .then((response) => {
        firebase.database().ref(`/teams/${response.val().team}`).once('value')
          .then((res) => {
            const members = Object.values(res.val().reports)
            console.log(members[0][userID])
            this.setState({
              message: {
                yesterday: members[0][userID].yesterday,
                today: members[0][userID].today,
                problem: members[0][userID].problem,
              },
            })
            this.setState({
              name: response.val().name,
            })
          })
      })
  }

  render() {
    return (
      <Layout>
        <Content className="contentAll">
          <Layout className="contentLeft">
            <Sidebar setUserID={this.setUserID} />
            <Content className="contentRight" style={{ margin: '0 16px' }}>
              <div className="date-picker-right">
                <DatePicker />
              </div>
              <Report />
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
