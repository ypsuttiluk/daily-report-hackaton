import '../App.css'
import React, { Component } from 'react';
import firebase from 'firebase';
import { Select,Button,Row,Col,List,Card } from 'antd';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
const {Option,OptGroup} = Select;
export default class ManageUser extends Component {
  constructor(props){
    super(props)
    this.state = {
      members: [],
      team: [],
      userNonTeam: [],
      selectUser: null,
      selectUserName: null,
      selectTeamValue: null,
    }
  }

  componentWillMount = () => {
    firebase.database().ref('/teams/').once('value')
    .then((response) => {
      for (let team in response.val()) {
        const newTeam = this.state.team
        newTeam.push(team)
        this.setState({
          team: newTeam,
        })
      }
    })

    firebase.database().ref('/users/').once('value')
    .then((response) => {
      for (let uid in response.val()) {
        const userNonT = this.state.userNonTeam
        if(typeof response.val()[uid].team === 'undefined') {
          userNonT.push({
            name: response.val()[uid].name,
            uid: response.val()[uid].uid,
          })
          this.setState({
            userNonTeam: userNonT,
          })
        }
      }
    })
  }

  selectTeam = (value) => {
    this.setState({
      selectTeamValue: value,
    })
    firebase.database().ref('/teams/').child(value).once('value')
    .then((response) => {
      const newMembers = []
      response.val().members.map((uid) => {
        firebase.database().ref('/users/').child(uid).once('value')
        .then((userResponse) => {
          // const newMembers = this.state.members
          newMembers.push({
            uid: uid,
            name: userResponse.val().name,
            team: userResponse.val().team
          })
          this.setState({
            members: newMembers,
          })
        })
      })
    })
  }

  selectUserToTeam = (value) => {
    const user = value.split('-')
    this.setState({
      selectUser: user[0],
      selectUserName: user[1],
    })
  }

  addToTeam = () => {
    if(this.state.selectTeamValue !== null) {
      const rootRef = firebase.database().ref('teams')
        .child(this.state.selectTeamValue)
        .child('members')

        rootRef.once('value')
        .then((response) => {
          const members = response.val()
          members.push(this.state.selectUser)
          rootRef.set(members)
          firebase.database().ref('users')
            .child(this.state.selectUser)
            .child('team')
            .set(this.state.selectTeamValue)
          const newMember = this.state.members
          newMember.push({
            uid: this.state.selectUser,
            name: this.state.selectUserName,
            team: this.state.selectTeamValue
          })
          this.setState({
            members: newMember,
          })
          const userNonT = this.state.userNonTeam
          const newUserNonT = []
          this.setState({
            userNonTeam: [],
          })
          userNonT.map((user) => {
             if(user.uid !== this.state.selectUser) {
              newUserNonT.push({
                name: user.name,
                uid: user.uid,
              })
              this.setState({
                userNonTeam: newUserNonT,
              })
             }
          })
        })
    }
  }

  removeToTeam = (team, uid, name) => {
    firebase.database().ref('/teams/').child(team).once('value')
    .then((response) => {
      response.val().members.map((resUid, key) => {
        if(uid === resUid) {
          firebase.database().ref('/teams/')
            .child(team)
            .child('members')
            .child(key)
            .remove()
        }
      })
    })
    firebase.database().ref('/users/')
      .child(uid)
      .child('team')
      .remove()
    const newMembers = []
    const newUserNonTeam = []
    this.state.members.map((val) => {
      if(val.uid !== uid) {
        newMembers.push(val)
      } else {
        newUserNonTeam.push({
          uid: val.uid,
          name: val.name
        })
      }
    })
    this.setState({
      members: newMembers,
      userNonTeam: newUserNonTeam,
    })
  }

  render() {
    console.log('userNonTeam : ', this.state.userNonTeam)
    return (
      <div className="input-box">
        <Row><h1 className="margint-texth1">จัดการ user ในแต่ละทีม</h1></Row>
        <Tabs defaultActiveKey="1" >
          <TabPane tab="สมาชิก" key="1">
            <Row>
              <Row className="list-layout">
              <Col span={2}>
                ทีม : 
              </Col>
              <Col span={7}>
                <Select  style={{ width: 220 }} onChange={this.selectTeam}>
                  {this.state.team.map((val) => {
                    return(<Option key={val} value={val}>{val}</Option>)
                  })}
                </Select>
              </Col>
              </Row>
              <Row className="list-layout">
              <Col span={2}>
                  เพิ่ม :
              </Col>
              {
                this.state.userNonTeam.length !== 0 ? (
                <div>
                  <Col span={7}>
                    <Select style={{ width: 220 }} onChange={this.selectUserToTeam}>
                      {this.state.userNonTeam.map((user) => {
                        return(<Option key={user.uid} value={`${user.uid}-${user.name}`}>{user.name}</Option>)
                      })}
                    </Select>
                  </Col>
                </div>
                ) : (
                  <div>
                    <Col span={7}>ไม่มี user ให้เพิ่มล่ะ</Col>
                  </div>
                )
              }
            </Row>
            <Row>
              <Col offset={2} span={3}>
                <Button type="primary" onClick={this.addToTeam}>เพิ่มเข้าทีม</Button>
              </Col>
            </Row>
            </Row>
            <Row className="list-layout">
              <List
                grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}
                dataSource={this.state.members}
                renderItem={member => (
                  <List.Item>
                    <Card>{member.name}</Card>
                    <Button type="danger" onClick={() =>{this.removeToTeam(this.state.selectTeamValue, member.uid, member.name)}}>Remove</Button>
                  </List.Item>
                )}
              />
            </Row>
          </TabPane>
        </Tabs>
      </div>
    )
  }
};
