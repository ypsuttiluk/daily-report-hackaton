import React, { Component } from 'react';
import setTimeJob from '../lib/cronjob'
import { Select,Button,Row,Col } from 'antd';

const Option = Select.Option;
const rowsMin = [];
for (let i = 0; i < 60; i++) {
  rowsMin.push(<Option value={i}>{i}</Option>);
}
const rowsHour = [];
for (var i = 0; i < 24; i++) {
  rowsHour.push(<Option value={i}>{i}</Option>);
}

export default class SetTimeDaily extends Component {
  constructor(props){
    super(props)
    this.state={
      min: 0,
      hour: 0
    }
  }

  onChangeHour = (val) => {
    this.setState({ hour: val })
  }

  onChangeMin = (val) => {
    this.setState({ min: val })
  }
  render() {
    const {hour,min} = this.state
    return (
      <div>
        <Row>
          <Col span={3}>ชั่วโมง</Col>
          <Col span={3}>นาที</Col>
        </Row>
        <Row>
        <Col span={3}>
          <Select defaultValue="0" style={{ width: 120 }}  onChange={this.onChangeHour} >
          {rowsHour}
          </Select>
        </Col>
        <Col span={3}>
          <Select defaultValue="0" style={{ width: 120 }} onChange={this.onChangeMin}>
          {rowsMin}
          </Select>
        </Col>
        </Row>
        <Button type="primary" onClick={() =>setTimeJob(hour,min)}>ตั้งเวลา Daliy ในแต่ละวัน</Button>
      </div>
    )
  }
};
