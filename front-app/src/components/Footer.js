import React from 'react';
import {Row,Col,Icon} from 'antd'
import '../App.css';

const Footer =()=> {
  return(
    <Row className="footer">
      <Col >
      <p className="h1-font"><Icon type="copyright" /> Power by Fascist Team</p>
      </Col>
    </Row>
  )
}
export default Footer;