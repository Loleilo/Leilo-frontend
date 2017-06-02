import React from 'react';
import * as Consts from '../../consts';
import './PermissionView.css'
import {Row, Col, Grid} from 'react-bootstrap';

export default function (props) {
    const perm = props.permissions;
    const r = ((perm & Consts.PERM_READ) !== 0);
    const w = ((perm & Consts.PERM_WRITE) !== 0);
    const c = ((perm & Consts.PERM_CONFIG) !== 0);
    const rClass = (r ? " perm-enabled" : " perm-disabled");
    const wClass = (w ? " perm-enabled" : " perm-disabled");
    const cClass = (c ? " perm-enabled" : " perm-disabled");

    function handleClick(btn) {
        if (props.setPermission) {
            if (btn === "R")
                props.setPermission(Consts.PERM_READ, !r);
            if (btn === "W")
                props.setPermission(Consts.PERM_WRITE, !w);
            if (btn === "C")
                props.setPermission(Consts.PERM_CONFIG, !c);
        }
    }

    return (
        <Grid fluid className="permission-view">
            <Row>
                <Col>
                    <button className={rClass} onClick={handleClick("R")}>R</button>
                </Col>
                <Col>
                    <button className={wClass} onClick={handleClick("W")}>W</button>
                </Col>
                <Col>
                    <button className={cClass} onClick={handleClick("C")}>C</button>
                </Col>
            </Row>
        </Grid>
    );
}