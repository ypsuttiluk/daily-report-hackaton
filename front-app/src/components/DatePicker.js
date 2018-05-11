import React, { Component } from 'react'
import moment from 'moment'
import { DatePicker } from 'antd'



let today = new Date()
today = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`


class DatePickerComponent extends Component {
  constructor(props) {
    super(props)
  }

  onChange = (date, dateString) => {
    console.log('data =>>>',dateString)
    this.props.setDate(dateString)
  }

  render() {
    return (
    <div>
      <DatePicker
        onChange={this.onChange}
        defaultValue={moment(today, 'D-M-YYYY')}
        format={'D-M-YYYY'}
        disabled={this.props.disabled}
      />
    </div>
    )
  }
}

export default DatePickerComponent