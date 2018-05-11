import React from 'react'

const Report = (props) => {
    return (
      <div className="content-div" >
      {
        props.reports.length !== 0 && props.reports.map((report, index) => {
          return (
            <div key={`${report.name}-${index}`}>
              <div>{report.name}</div>
              <ul>
                <li>เมื่อวานทำอะไรบ้าง : {report.message.yesterday}</li>
                <li>วันนี้จะทำอะไร : {report.message.today}</li>
                <li>ติดปัญหาอะไรบ้าง : {report.message.problem}</li>
              </ul>
            </div>
          )
        })
      }
    </div>
  )
}

export default Report