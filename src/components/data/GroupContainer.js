import React from 'react';
import {LAZY_POLL_INTERVAL} from '../../consts';
import {apicall} from  '../../data/apicall';
import AtomContainer from "./AtomContainer";
import GroupView from "../dumb/GroupView";

export default class GroupContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groupName: null,
            groupPermissions: null,
            atoms: null
        };
        this.lazyLoad = {
            groupName: () => {
                return this.readGroupName().then(() => this.lazyTimerStart());
            },

            groupPermissions: () => {
                return this.readGroupPerms().then(() => this.lazyTimerStart());
            },
            atoms: () => {
                return this.readAtoms().then(() => this.lazyTimerStart());
            }
        };

        this.actions = {
            setGroupName: (name) => this.setGroupName(name),
        };
    }

    readGroupName() {
        let x = this;
        return apicall("getGroupName", {
            group_id: this.props.group_id
        }).then(function (res) {
            x.setState({
                groupName: res
            });
        });
    }

    readGroupPerms() {
        let x = this;
        return apicall("getGroupPermissions", {
            group_id: this.props.group_id
        }).then(function (res) {
            x.setState({
                groupPermissions: res
            });
        });
    }

    readAtoms() {
        let x = this;
        return apicall("listAtoms", {
            group_id: this.props.group_id
        }).then(function (res) {
            let tmp = res.map((cust) => (<AtomContainer
                key={cust}
                group_id={x.props.group_id}
                atom_id={cust}
            />));
            x.setState({
                atoms: tmp
            });
        });
    }

    setGroupName(name) {

    }

    setGroupPerm(perm, value) {

    }

    lazyTimerStart() {
        if (!this.timer)
            this.timer = setInterval(() => this.refresh(), LAZY_POLL_INTERVAL);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        this.setState({
            groupName: null,
            groupPermissions: null,
            atoms: null
        });
        this.timer = null;
    }

    refresh() {
        if (this.state.atoms)
            this.readAtoms();
        if (this.state.groupName)
            this.readGroupName();
        if (this.state.groupPermissions)
            this.readGroupPerms();
    }

    render() {
        return (
            <GroupView
                lazyLoad={this.lazyLoad}
                groupName={this.state.groupName}
                permissions={this.state.groupPermissions}
                atoms={this.state.atoms}
            />
        );
    }
}