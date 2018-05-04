import React, { Component } from 'react'
import {
  Card, 
  Col, 
  Row, 
  Menu, 
  Icon, 
  Switch,
  Layout,
  Breadcrumb,
} from 'antd'
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;


class Contents  extends Component {
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <SubMenu
              key="sub2"
              title={<span><Icon type="team" /><span>Team</span></span>}
            >
              <SubMenu
                key="sub3"
                title={<span><Icon type="team" /><span>Team1</span></span>}
              >
                <Menu.Item key="1">Team 1</Menu.Item>
                <Menu.Item key="2">Team 2</Menu.Item>
                <Menu.Item key="3">Team 3</Menu.Item>
                <Menu.Item key="4">Team 2</Menu.Item>
                <Menu.Item key="5">Team 3</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub4"
                title={<span><Icon type="team" /><span>Team2</span></span>}
              >
                <Menu.Item key="6">Team 1</Menu.Item>
                <Menu.Item key="7">Team 2</Menu.Item>
                <Menu.Item key="8">Team 3</Menu.Item>
                <Menu.Item key="9">Team 2</Menu.Item>
                <Menu.Item key="10">Team 3</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub5"
                title={<span><Icon type="team" /><span>Team3</span></span>}
              >
                <Menu.Item key="11">Team 1</Menu.Item>
                <Menu.Item key="12">Team 2</Menu.Item>
                <Menu.Item key="13">Team 3</Menu.Item>
                <Menu.Item key="14">Team 2</Menu.Item>
                <Menu.Item key="15">Team 3</Menu.Item>
              </SubMenu>
              
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              Bill is a cat.
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
  
export default Contents ;