import React from 'react';
import * as API from './data/apicall';
import Login from "./components/app/Login";
import Dashboard from "./components/app/Dashboard";
import './styles/bootstrap/bootstrap.css';
import './styles/basic.css';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: false
        };
        this.updateAuthState();
    }

    login(user, pass) {
        let x = this;
        return new Promise(function (resolve, reject) {
            API.apicall("login", {
                username: user,
                password: pass
            }).then(function () {
                x.updateAuthState();
                resolve();
            }).catch(function (error) {
                reject("Error logging in - error code " + error.errorCode + ":" + error.message);
            });
        });
    }

    updateAuthState() {
        let x = this;
        API.apicall("isLoggedIn", {}).then(function (res) {
            // console.log(res);
            x.setState({
                isLoggedIn: res
            });
        });
    }

    logout() {
        let x=this;
        API.apicall("killSession", {}).then(function () {
            x.updateAuthState();
        });
    }

    render() {
        if (this.state.isLoggedIn) {

            return (
                <Dashboard
                    onLogout={()=>this.logout()}
                />
            );
        } else {
            return (
                <Login onSubmit={(user, pass) => this.login(user, pass)} onCancel={() => this.updateAuthState()}/>
            );
        }
    }
}

export default App;