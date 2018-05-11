import React, { Component } from 'react'

export default class componentName extends Component {
  constructor() {
    super()
    this.state = {
      teams: [
        {
          name: 'TN-Store',
          members: [ 'tarn', 'noon' ],
        },
        {
          name: 'MapMagic',
          members: [ 'ped', 'wiw', 'bike'],
        }
      ]
    }
  }

  renderMember = (members) => {
    return members.map((member,index) => {
      return (
        <div key={`member-${index}`}>--{member}</div>
      )
    })
  }

  render() {
    return (
      <div>
        {this.state.teams.map((team, index) => {
          return (
            <div key={`team-${index}`}>
              ชื่อทีม {team.name}
              {this.renderMember(team.members)}
            </div>
          )
        })}
      </div>
    )
  }
}
