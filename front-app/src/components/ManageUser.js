import '../App.css'
import React, { Component } from 'react';
import { Select,Button,Row,Col } from 'antd';
import { Tabs } from 'antd';

const TabPane = Tabs.TabPane;
const {Option,OptGroup} = Select;
export default class ManageUser extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: '',
      team: ''
    }
  }

  selectUser=(value)=> {
    this.setState({
      user: value
    })
  }

  selectTeam = (value) =>{
    this.setState({
      team: value
    })
  }

  render() {
    return (
      <div>
        <Row>จัดการ user ในแต่ละทีม</Row>
        <Tabs defaultActiveKey="1" >
          <TabPane tab="เพิ่มสมาชิกเข้าทีม" key="1">
            <Row>
              <Col span={3}>
                รายชื่อ
              </Col>
              <Col span={3}>
                ทีม
              </Col>
            </Row>
            <Row>
              <Col span={3}>
              <Select  style={{ width: 120 }} onChange={this.selectUser}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" >Disabled</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
              </Col>
              <Col span={3}>
              <Select  style={{ width: 120 }} onChange={this.selectTeam}>
                <Option value="1">Jack</Option>
                <Option value="2">Lucy</Option>
                <Option value="3" >Disabled</Option>
                <Option value="4">yiminghe</Option>
              </Select>
              </Col>
            </Row>
            <Row><Button type="primary">เพิ่มสมาชิกเข้าทีม</Button></Row>
          </TabPane>
          <TabPane tab="นำสมาชิกออกจากทีม" key="2">
            <Row>
              <Select
                style={{ width: 200 }}
              >
                <OptGroup label="Manager">
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                </OptGroup>
                <OptGroup label="Engineer">
                  <Option value="Yiminghe">yiminghe</Option>
                </OptGroup>
              </Select>
            </Row>
            <Row><Button type="danger">นำสมาชิกออกจากทีม</Button></Row>
          </TabPane>
        </Tabs>
      </div>
    )
  }
};
