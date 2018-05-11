import React from 'react'
import moment from 'moment'
import { DatePicker } from 'antd'

const onChange = (date) => {
  console.log('data =>>>',date._i)
}

const DatePickerComponent = () => {
  let today = new Date()
  today = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`

  return (
  <div>
    <DatePicker
      onChange={onChange}
      defaultValue={moment(today, 'DD-MM-YYYY')}
      format={'DD-MM-YYYY'}
    />
  </div>
  )
}

export default DatePickerComponent