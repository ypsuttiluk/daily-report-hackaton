import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
import firebase from 'firebase'
import forEach from 'lodash.foreach'

const { SubMenu } = Menu
const { Sider } = Layout

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      teams: [],
    }
  }

  componentWillMount() {
    firebase.database().ref('/teams/').once('value')
    .then((response) => {
      const teams = response.val()
      this.setState({
        teams,
      })

      forEach(teams, ({members}, key) => {
        if(typeof members !== 'undefined') {
          members.map((uid, index) => {
            firebase.database().ref(`/users/${uid}/name`).once('value')
            .then((user) => {
              const teamState = this.state.teams
              teamState[`${key}`].members[index] = user.val()
              // const team = { name: key, members: members.push(user.val())}
              // teams.push(team)
              this.setState({
                teams: teamState,
              })
            })
          })
        }
      })
    })
  }


  render() {
    console.log(this.state.teams)
    
    return(
      <Sider className="MenuBar">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub']}
          style={{ height: '100%' }}
        >
          <SubMenu key="sub" title={<span><Icon type="apple" />Team </span>}>
              {/* {this.state.teams.map((team, index) => {
                return (
                <SubMenu key={`${index}`} title={<span><Icon type="apple" />{index}</span>}>
                </SubMenu>
                )
              })} */}
              {/* <SubMenu key="TN-Store" title={<span><Icon type="apple" />TN-Store </span>}>
                <Menu.Item key="1"><p>ทั้งหมด</p></Menu.Item>
                <Menu.Item key="2"><p>เป็ด</p></Menu.Item>
                <Menu.Item key="3"><p>บิว</p></Menu.Item>
              </SubMenu> */}
              {/* <Menu.Item key="4"><p>BOF-Jobthai-Upgrade</p></Menu.Item> */}
              {/* {this.state.MapMagic.member.map((uid, index) => {
            return (
              <Menu.Item key={`MapMagic-${index}`}><p onClick={() => this.props.setUserID(uid)}>{uid}</p></Menu.Item>
            )
          })} */}
              {/* <Menu.Item key="5"><p>MapMagic</p></Menu.Item> */}
    
          </SubMenu>
        </Menu>
      </Sider>
    )
  } 
}

export default Sidebar
