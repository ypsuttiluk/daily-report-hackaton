import React, { Component } from 'react';
import { Input,Button,Row } from 'antd';
import '../App.css'
export default class ManageTeam extends Component {
  constructor(props){
    super(props)
    this.state = {
      isEdit: false
    }
  }
  onEdit=()=>{
    const {isEdit} = this.state
    if(isEdit){
      this.setState({
        isEdit: false
      }) 
    }else {
      this.setState({
        isEdit: true
      })  
    }
  }

  render() {
    return (
      <div className="input-box">
      <Row>Manage Team</Row>
      <Row>
        <Input  placeholder="Team Name" />
      </Row>
      <Row>
        <Button type="primary">Add Team</Button>
      </Row>
      <Row>
          <Button onClick={this.onEdit}>Edit Team </Button>
      </Row>
      {this.state.isEdit &&
        <Row>
            <Input addonBefore="Old Name Team" placeholder="Team Name" />
            <Input addonBefore="New Name Team" placeholder="Team Name" />
            <Button onClick={this.onEdit}>OK</Button>
        </Row>
      }
      <Row>
        <Button type="danger">Delete Team</Button>
      </Row>
      </div>
    )
  }
};
