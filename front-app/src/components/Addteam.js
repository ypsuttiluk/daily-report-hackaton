import React, { Component } from 'react';
import { Input, Row, Button ,Form,  Icon } from 'antd';
import Team from './Team'
const FormItem = Form.Item;

let uuid = 0;

class Addteam extends Component {

    constructor() {
        super()
        this.state = {
            teamName: '',
            members: []
        }
    }
    addteam = (event) => {
        event.preventDefault()
        const addteam = this.state.teamName
        const addmembers = this.state.members
        const team = { addteam, addmembers }
        let list = []
        list.push(team)
        // this.setState({
        //     lists: this.state.lists.concat(list)
        // })
    }
    Changeteam = (event) => {
        this.setState({ teamName: event.target.value })
    }
    Changemember = (event) => {
        this.setState({ members: event.target.value })
    }
    remove = (k) => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 1) {
          return;
        }
    
        // can use data-binding to set
        form.setFieldsValue({
          keys: keys.filter(key => key !== k),
        });
      }
    
      add = () => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(uuid);
        uuid++;
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
          keys: nextKeys,
        });
      }
    
      handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      }

    render() {
        return (
            <div className="team-input">
                <form onSubmit={this.addteam} >
                    <h1>Addteam</h1>
                    <Row><Input type="text" placeholder="ชื่อทีม" onChange={this.Changeteam}/></Row>
                    <Row ><Input type="text" placeholder="สมาชิก" /></Row>
                    <Row><Input type="text" placeholder="สมาชิก" /></Row>
                    <Row><Input type="text" placeholder="สมาชิก" /></Row>
                    {/* <button type="submit" />add */}
                    {/* <button type="submit" />delete */}
                    <button type="primary" >Save</button>
                </form>
                <Team />
            </div>
        );
    }
}

export default Addteam;