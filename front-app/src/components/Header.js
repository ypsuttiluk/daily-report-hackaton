import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
class Header extends Component {
  render() {
    return (
      <div className="header-top block">
        <div className="block-left"><h1 className="h1-font"><Icon type="message" className="icon" />Daily Report Hackathon</h1></div>
        <div className="block-right">
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
          style={{ lineHeight: '60px' }}
          >
            <Menu.Item key="1">Report</Menu.Item>
            <Menu.Item key="2">Team</Menu.Item>
          </Menu>
        </div>
      </div>
    );
  }
}

export default Header;