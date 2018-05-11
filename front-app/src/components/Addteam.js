import React, { Component } from 'react';
import { Input, Row, Button } from 'antd';


class Addteam extends Component {

    constructor() {
        super()
        this.state = {
            teamName: '',
            members: []
        }
    }
    addteam = (event) => {
        event.preventDefault()
        const addteam = this.state.teamName
        const addmembers = this.state.members
        const team = { addteam, addmembers }
        let list = []
        list.push(team)
        // this.setState({
        //     lists: this.state.lists.concat(list)
        // })
    }
    Changeteam = (event) => {
        this.setState({ teamName: event.target.value })
    }
    Changemember = (event) => {
        this.setState({ members: event.target.value })
    }

    render() {

        return (
            <div className="team-input">
                <form onSubmit={this.addteam} >
                    <h1>Addteam</h1>
                    <Row><Input type="text" placeholder="ชื่อทีม" onChange={this.Changeteam}/></Row>
                    <Row ><Input type="text" placeholder="สมาชิก" /></Row>
                    <Row><Input type="text" placeholder="สมาชิก" /></Row>
                    <Row><Input type="text" placeholder="สมาชิก" /></Row>
                    {/* <button type="submit" />add */}
                    {/* <button type="submit" />delete */}
                    <button type="submit" >Save</button>
            </form>
            </div>
        );
    }
}

export default Addteam;