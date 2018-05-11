import React, { Component } from 'react';
import firebase from 'firebase';
import { Input,Button,Row,Tabs } from 'antd';
import '../App.css'

const TabPane = Tabs.TabPane;
export default class ManageTeam extends Component {
  constructor(props){
    super(props)
    this.state = {
      isEdit: false,
      addTeamName: '',
      editTeamNameOld: '',
      editTeamNameNew: '',
      deleteTeamName: '',
    }
  }

  addTeam = () => {
    firebase.database().ref('teams')
    .child(this.state.addTeamName)
    .set({name: this.state.addTeamName})
    this.setState({
      addTeamName: '',
    })
  }

  editTeam = async () => {
    const oldData =  new Promise((resolve) => {
      firebase.database().ref('/teams/').once('value')
      .then((response) => {
       resolve(response.val()[this.state.editTeamNameOld])
      })
    })
    oldData.then((data) => {
      typeof data.members!== 'undefined' && data.members.map((uid) => {
      firebase.database().ref('users')
        .child(uid)
        .child('team')
        .set(this.state.editTeamNameNew)
      })
      data.name = this.state.editTeamNameNew
      firebase.database().ref('teams')
      .child(this.state.editTeamNameNew)
      .set(data)
      firebase.database().ref('/teams/').child(this.state.editTeamNameOld).remove()
      this.setState({
        editTeamNameOld: '',
        editTeamNameNew: '',
      })
    })
  }

  deleteTeam = () => {
    const oldData =  new Promise((resolve) => {
      firebase.database().ref('/teams/').once('value')
      .then((response) => {
       resolve(response.val()[this.state.deleteTeamName])
      })
    })
    oldData.then((data) => {
      if(typeof data.members !== 'undefined'){
        data.members.map((uid) => {
        firebase.database().ref('users')
          .child(uid)
          .child('team')
          .remove()
        })
      }
      firebase.database().ref('/teams/').child(this.state.deleteTeamName).remove()
      this.setState({
        deleteTeamName: '',
      })
    })
  }

  render() {
    return (
      <div className="input-box">
      <Row><h1 className="margint-texth1">Manage Team</h1></Row>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Add Team" key="1">
          <Row>
            <Input placeholder="Team Name" value={this.state.addTeamName} onChange={(e) => {this.setState({addTeamName:e.target.value})}}/>
          </Row>
          <Row >
            <Button className="margint-botton" type="primary" onClick={this.addTeam}>Add Team</Button>
          </Row>
        </TabPane>
        <TabPane tab="Edit Team" key="2">
          <Row>
            <Input  addonBefore="Old Name Team" placeholder="Team Name" value={this.state.editTeamNameOld} onChange={(e) => {this.setState({editTeamNameOld:e.target.value})}}/>
            <Input addonBefore="New Name Team" placeholder="Team Name" value={this.state.editTeamNameNew} onChange={(e) => {this.setState({editTeamNameNew:e.target.value})}}/>
            <Button  className="margint-botton" onClick={this.editTeam}>OK</Button>
          </Row>
        </TabPane>
        <TabPane tab="Delete Team" key="3">
        <Row>
        <Input addonBefore="Old Name Team" placeholder="Team Name" value={this.state.deleteTeamName} onChange={(e) => {this.setState({deleteTeamName:e.target.value})}}/>
          <Button  className="margint-botton" type="danger" onClick={this.deleteTeam}>Delete Team</Button>
        </Row>
        </TabPane>
      </Tabs>
      </div>
    )
  }
};
