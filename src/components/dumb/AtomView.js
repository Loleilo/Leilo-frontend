import React from 'react';
import PermissionView from './PermissionView';
import "./EntityView.css";
import {Row, Col, Grid} from 'react-bootstrap';

export default function (props) {
    props.lazyLoad.permissions();
    props.lazyLoad.value();

    return (
        <Grid className="entity-view">

            <Row className="entity-info">
                <Col className="entity-value">Atom value: {props.value}</Col>
                <Col className="entity-value">
                    <Grid fluid>
                        <Row>
                            <Col>
                                Permissions:
                            </Col>
                            <Col>
                                <PermissionView
                                    permissions={props.permissions}
                                />
                            </Col>
                        </Row>
                    </Grid>
                </Col>
            </Row>
        </Grid>
    );
}