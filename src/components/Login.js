import React from 'react';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            err_msg: ""
        };
    }

    updatePass(evt) {
        this.setState({password: evt.target.value});
    }

    updateUser(evt) {
        this.setState({username: evt.target.value});
    }

    onBtnClick() {
        let x=this;
        this.props.onSubmit(this.state.username, this.state.password).catch(function (msg) {
            if (msg) {
                x.setState({
                    password: "",
                    err_msg: msg
                });
            }else{
                this.setState({
                    username: "",
                    password: "",
                    err_msg: ""
                });
            }
        });
    }

    onBtnCancel() {
        this.props.onCancel();
        this.setState({
            username: "",
            password: "",
            err_msg: ""
        });
    }

    render() {
        return (
            <div>
                <h1>Login to your account</h1>
                <form>
                    Username:
                    <input type="text" onChange={(evt) => this.updateUser(evt)} value={this.state.username}/>
                    <br/>
                    Password:
                    <input type="password" onChange={(evt) => this.updatePass(evt)} value={this.state.password}/>
                    <br/>
                    <input type="button" onClick={() => this.onBtnClick()}
                           value="Login"/>
                    <input type="button" onClick={() => this.onBtnCancel()} value="Cancel"/>
                </form>
                <span>{this.state.err_msg}</span>
            </div>
        );
    };
}

export default Login;