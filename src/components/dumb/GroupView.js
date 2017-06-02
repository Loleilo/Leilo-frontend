import React from 'react';
import PermissionView from './PermissionView';
import ExpandIcon from './ExpandIcon';
import './EntityView.css';
import {Row, Col, Grid} from 'react-bootstrap';

export default class GroupView extends React.Component {
    constructor(props) {
        super(props);

        this.props.lazyLoad.groupName();
        this.props.lazyLoad.groupPermissions();

        this.state = {
            isExpanded: false
        };
    }

    onExpandToggle() {
        let x = this;
        this.props.lazyLoad.atoms().then(function () {
            x.setState({
                isExpanded: !x.state.isExpanded
            });
        });
    }

    render() {
        let cust = null;
        if (this.state.isExpanded) {
            cust = (<div>
                {this.props.atoms}
            </div>);
        }
        return (
            <Grid className="entity-view">

                <Row className="entity-info">
                    <Col>
                        <ExpandIcon expanded={this.state.isExpanded} onExpandToggle={() => this.onExpandToggle()}/>
                    </Col>
                    <Col className="entity-value">
                        Group name: {this.props.groupName}
                    </Col>
                    <Col className="entity-value">
                        <Grid fluid>
                            <Row>
                                <Col>
                                    Permissions:
                                </Col>
                                <Col>
                                    <PermissionView
                                        permissions={this.props.permissions}
                                    />
                                </Col>
                            </Row>
                        </Grid>
                    </Col>
                </Row>
                {cust}
            </Grid>
        );
    }
}