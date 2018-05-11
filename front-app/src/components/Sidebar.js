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
        <SubMenu key="sub1" title={<span><Icon type="apple" />Team P'Set</span>}>
          {/* {this.state.TNStore.member.map((uid, index) => {
        return (
          <Menu.Item key={`TNStore-${index}`}><p onClick={() => this.setUserID(uid)}>{uid}</p></Menu.Item>
        )
      })} */}
          <Menu.Item key="1"><p onClick={() => this.props.setUserID('1')}>วิว</p></Menu.Item>
          <Menu.Item key="2"><p onClick={() => this.props.setUserID('2')}>เป็ด</p></Menu.Item>
          <Menu.Item key="3"><p onClick={() => this.props.setUserID('3')}>บูท</p></Menu.Item>
          <Menu.Item key="4"><p onClick={() => this.props.setUserID('4')}>โจ</p></Menu.Item>
          <Menu.Item key="5"><p onClick={() => this.props.setUserID('5')}>บิว</p></Menu.Item>
        </SubMenu>

        <SubMenu key="sub2" title={<span><Icon type="apple-o" />Team P'Ice</span>}>
          {/* {this.state.MapMagic.member.map((uid, index) => {
        return (
          <Menu.Item key={`MapMagic-${index}`}><p onClick={() => this.props.setUserID(uid)}>{uid}</p></Menu.Item>
        )
      })} */}
          <Menu.Item key="6"><p onClick={() => this.props.setUserID('6')}>นัย</p></Menu.Item>
          <Menu.Item key="7"><p onClick={() => this.props.setUserID('7')}>ทิว</p></Menu.Item>
          <Menu.Item key="8"><p onClick={() => this.props.setUserID('8')}>โอปอ</p></Menu.Item>
          <Menu.Item key="9"><p onClick={() => this.props.setUserID('9')}>ฟลุ๊ค</p></Menu.Item>
          <Menu.Item key="10"><p onClick={() => this.props.setUserID('10')}>ไบต์</p></Menu.Item>
          <Menu.Item key="11"><p onClick={() => this.props.setUserID('11')}>กานต์</p></Menu.Item>
        </SubMenu>
      </SubMenu>
    </Menu>
  </Sider>
)

export default Sidebar
