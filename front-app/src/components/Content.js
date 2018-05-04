import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'
import firebase from 'firebase'

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const config = {
  apiKey: "AIzaSyAPHQAAG6znTUbG6PL7Oiw2hwI50lrPtQY",
  authDomain: "daily-report-14ce7.firebaseapp.com",
  databaseURL: "https://daily-report-14ce7.firebaseio.com",
  projectId: "daily-report-14ce7",
  storageBucket: "daily-report-14ce7.appspot.com",
  messagingSenderId: "545247969478"
};
firebase.initializeApp(config);

class Contents extends Component {
  render() {
    console.log(firebase.app().name)
    return (
        <Layout>
        <Content className="contentAll">
          <Layout className="contentLeft">
            <Sider className="MenuBar">
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
              >
              <SubMenu key="sub" title={<span><Icon type="apple" />Team </span>}>
                <SubMenu key="sub1" title={<span><Icon type="apple" />Team P'Set</span>}>
                  <Menu.Item key="1">name</Menu.Item>
                  <Menu.Item key="2">name</Menu.Item>
                  <Menu.Item key="3">name</Menu.Item>
                  <Menu.Item key="4">name</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={<span><Icon type="apple-o" />Team P'Ice</span>}>
                  <Menu.Item key="5">name</Menu.Item>
                  <Menu.Item key="6">name</Menu.Item>
                  <Menu.Item key="7">name</Menu.Item>
                  <Menu.Item key="8">name</Menu.Item>
                </SubMenu>
                </SubMenu>
              </Menu>
            </Sider>
            <Content className="contentRight" >
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            </Content>
          </Layout>
        </Content>
      </Layout>
    );
  }
}

export default Contents;
