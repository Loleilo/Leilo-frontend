import React from 'react';
import {Row, Col, Grid} from 'react-bootstrap';

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
        let x = this;
        this.props.onSubmit(this.state.username, this.state.password).catch(function (msg) {
            if (msg) {
                x.setState({
                    password: "",
                    err_msg: msg
                });
            } else {
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
            <Grid fluid>
                <Row><h1>Login to your account</h1></Row>

                <form>
                    <Row>
                        <Col>Username:</Col>
                        <Col><input type="text" onChange={(evt) => this.updateUser(evt)}
                                    value={this.state.username}/>
                        </Col><br/></Row><Row>
                    <Col>Password:</Col>
                    <Col><input type="password" onChange={(evt) => this.updatePass(evt)}
                                value={this.state.password}/>
                    </Col><br/>
                </Row><Row>
                    <Col><input type="button" onClick={() => this.onBtnClick()}
                                value="Login"/></Col>
                    <Col><input type="button" onClick={() => this.onBtnCancel()} value="Cancel"/></Col></Row>
                </form>

                <span>{this.state.err_msg}</span>
            </Grid>
        );
    };
}

export default Login;