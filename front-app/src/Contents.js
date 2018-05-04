import React, { Component } from 'react';
import { Layout, Menu, Icon ,Breadcrumb} from 'antd';
const { SubMenu } = Menu;
const {  Content, Sider } = Layout;

class Contents extends Component {
  render() {
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
                  <Menu.Item key="1">Name</Menu.Item>
                  <Menu.Item key="2">Name</Menu.Item>
                  <Menu.Item key="3">Name</Menu.Item>
                  <Menu.Item key="4">Name</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={<span><Icon type="apple-o" />Team P'Ice</span>}>
                  <Menu.Item key="5">Name</Menu.Item>
                  <Menu.Item key="6">Name</Menu.Item>
                  <Menu.Item key="7">Name</Menu.Item>
                  <Menu.Item key="8">Name</Menu.Item>
                </SubMenu>
                </SubMenu>
              </Menu>
            </Sider>
            <Content className="contentRight" style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div className="content-div" >
              Bill is a cat.
            </div>
          </Content>
          </Layout>
        </Content>
      </Layout>
    );
  }
}

export default Contents;
