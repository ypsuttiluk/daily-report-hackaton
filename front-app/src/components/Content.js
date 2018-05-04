import React, { Component } from 'react'
import { Layout, Menu, Icon ,Breadcrumb} from 'antd'
import users from '../user.json'

const { SubMenu } = Menu;
const {  Content, Sider } = Layout;


class Contents extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      message: {
        a1: '',
        a2: '',
        a3: '', 
      }
    }
  }

  setUserID = (userID) => {
    const userData = users.find(user => user.id === userID)
    this.setState({
      name:userData.name,
      message :userData.message,
    })
  }

  render() {
    // console.log(user)
    return (
        <Layout>
        <Content className="contentAll">
          <Layout className="contentLeft">
            <Sider className="MenuBar">
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub']}
                style={{ height: '100%' }}
              >
               <SubMenu key="sub" title={<span><Icon type="apple" />Team </span>}>
                <SubMenu key="sub1" title={<span><Icon type="apple" />Team P'Set</span>}>
                  <Menu.Item key="1"><p onClick={() => this.setUserID('1')}>วิว</p></Menu.Item>
                  <Menu.Item key="2"><p onClick={() => this.setUserID('2')}>เป็ด</p></Menu.Item>
                  <Menu.Item key="3"><p onClick={() => this.setUserID('3')}>บูท</p></Menu.Item>
                  <Menu.Item key="4"><p onClick={() => this.setUserID('4')}>โจ</p></Menu.Item>
                  <Menu.Item key="5"><p onClick={() => this.setUserID('5')}>บิว</p></Menu.Item>
                </SubMenu>

                <SubMenu key="sub2" title={<span><Icon type="apple-o" />Team P'Ice</span>}>
                  <Menu.Item key="6"><p onClick={() => this.setUserID('6')}>นัย</p></Menu.Item>
                  <Menu.Item key="7"><p onClick={() => this.setUserID('7')}>ทิว</p></Menu.Item>
                  <Menu.Item key="8"><p onClick={() => this.setUserID('8')}>โอปอ</p></Menu.Item>
                  <Menu.Item key="9"><p onClick={() => this.setUserID('9')}>ฟลุ๊ค</p></Menu.Item>
                  <Menu.Item key="10"><p onClick={() => this.setUserID('10')}>ไบต์</p></Menu.Item>
                  <Menu.Item key="11"><p onClick={() => this.setUserID('11')}>กานต์</p></Menu.Item>
                </SubMenu>
                </SubMenu>
              </Menu>
            </Sider>
            <Content className="contentRight" style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>{this.state.name}</Breadcrumb.Item>
            </Breadcrumb>
            <div className="content-div" >
              <ul>
                <li>{this.state.message.a1}</li>
                <li>{this.state.message.a2}</li>
                <li>{this.state.message.a3}</li>
              </ul>
            </div>
          </Content>
          </Layout>
        </Content>
      </Layout>
    );
  }
}

export default Contents;
