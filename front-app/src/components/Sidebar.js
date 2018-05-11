import React from 'react'
import { Layout, Menu, Icon } from 'antd'

const { SubMenu } = Menu
const { Sider } = Layout

const Sidebar = props => (
  <Sider className="MenuBar">
    <Menu
      mode="inline"
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub']}
      style={{ height: '100%' }}
    >
      <SubMenu key="sub" title={<span><Icon type="apple" />Team </span>}>
          {/* {this.state.TNStore.member.map((uid, index) => {
        return (
          <Menu.Item key={`TNStore-${index}`}><p onClick={() => this.setUserID(uid)}>{uid}</p></Menu.Item>
        )
      })} */}
          <SubMenu key="TN-Store" title={<span><Icon type="apple" />TN-Store </span>}>
          <Menu.Item key="1"><p>ทั้งหมด</p></Menu.Item>
            <Menu.Item key="2"><p>เป็ด</p></Menu.Item>
            <Menu.Item key="3"><p>บิว</p></Menu.Item>
          </SubMenu>
          <Menu.Item key="4"><p>BOF-Jobthai-Upgrade</p></Menu.Item>
          {/* {this.state.MapMagic.member.map((uid, index) => {
        return (
          <Menu.Item key={`MapMagic-${index}`}><p onClick={() => this.props.setUserID(uid)}>{uid}</p></Menu.Item>
        )
      })} */}
          <Menu.Item key="5"><p>MapMagic</p></Menu.Item>

      </SubMenu>
    </Menu>
  </Sider>
)

export default Sidebar
