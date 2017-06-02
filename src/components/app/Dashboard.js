import React from 'react';
import GroupContainer from "../data/GroupContainer";

class Dashboard extends React.Component {
    render() {
        return (
            <div>
                <h1>Under construction</h1>
                <br/>
                <GroupContainer
                    group_id="5d663818-47e3-11e7-8989-5b95d87ce60a"
                />
                <br/>
                <a onClick={this.props.onLogout}>Logout</a>
            </div>
        );
    }
}

export default Dashboard;