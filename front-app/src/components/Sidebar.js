import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
import firebase from 'firebase'
import find from 'lodash.find'

const { SubMenu } = Menu
const { Sider } = Layout

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      teamsKey: [],
      teamsValue: [],
      membersKey: [],
    }
  }

  componentWillMount() {
    const response = new Promise((resolve) => {
      firebase.database().ref('/teams/').once('value')
      .then((response) => {
        resolve(response.val())
      })
    })

    response.then((data) => {
      const teamsKey = Object.keys(data)
      const teamsValue= Object.values(data)
      
      teamsValue.map(team => {
        typeof team.members !== 'undefined' && team.members.map((uid, index) => {
          const name = new Promise((resolve) => {
            firebase.database().ref(`/users/${uid}/name`).once('value')
            .then(response => {
              resolve(response.val())
            })
          })
          name.then(name => {
            team.members[index] = name

            this.setState({
              teamsKey: teamsKey,
              teamsValue: teamsValue,
              membersKey: [
                ...this.state.membersKey,
                { team: team.name, uid, name }
              ]
            })
          })
        })
      })
    })
  }

  renderMember = (teamName) => {
    return this.state.teamsValue.map((team,index) => {
      return team.name === teamName && typeof team.members !== 'undefined' && team.members.map((name) => {
        const uid = find(this.state.membersKey, (member) => {
          return member.name === name
        })
        return (
          <Menu.Item><p onClick={() => this.getReport([uid], teamName)}>{name}</p></Menu.Item>
        )
      })
    })
  }

  getReport = (uid, teamName) => {
    this.props.getReports(uid, teamName, this.state.membersKey)
  }

  render() {
    return(
      <Sider className="MenuBar">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub']}
          style={{ height: '100%' }}
        >
          <SubMenu key="sub" title={<span><Icon type="apple" />Team </span>}>
              {this.state.teamsKey.map((team, index) => {
                return (
                <SubMenu key={`${team}-${index}`} title={<span><Icon type="apple" />{team}</span>}>
                  <Menu.Item><p onClick={() => this.getReport(this.state.membersKey, team)}>ทั้งหมด</p></Menu.Item>
                  {this.renderMember(team)}
                </SubMenu>
                )
              })}
          </SubMenu>
        </Menu>
      </Sider>
    )
  } 
}

export default Sidebar
