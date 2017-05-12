import React from 'react';

class Dashboard extends React.Component {
    render() {
        return (
            <div>
                <h1>Under construction</h1>
                <br/>
                <a onClick={this.props.onLogout}>Logout</a>
            </div>
        );
    }
}

export default Dashboard;