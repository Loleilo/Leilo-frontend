import React from 'react';
import {LAZY_POLL_INTERVAL, LIVE_POLL_INTERVAL} from '../../consts';
import {apicall} from  '../../data/apicall';
import AtomView from '../dumb/AtomView';
import * as Const from '../../consts';

export default class AtomContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            value: null,
            permissions: null,
        };
        this.lazyLoad = {
            value: () => this.liveTimerStart(),
            permissions: () => this.lazyTimerStart()
        };
        this.actions = {
            write: (value) => this.write(value),
        };
    }


    componentDidMount() {
        this.isMount = true;
    }

    liveTimerStart() {
        if (!this.fastTimer) {
            setTimeout(() => this.readValue(), 0);
            this.fastTimer = setInterval(() => this.refreshLive(), LIVE_POLL_INTERVAL);
        }
    }

    lazyTimerStart() {
        if (!this.slowTimer) {
            setTimeout(() => this.readPermissions(), 0);
            this.slowTimer = setInterval(() => this.refresh(), LAZY_POLL_INTERVAL);
        }
    }

    readValue() {
        let x = this;
        new Promise(function (resolve, reject) {
            if (x.state.permissions)
                resolve(x.state.permissions)
            else
                x.readPermissions().then(resolve(x.state.permissions));
        }).then(function (res) {
            if (res & Const.PERM_READ !== 0)
                return apicall("readAtom", {
                    group_id: x.props.group_id,
                    atom_id: x.props.atom_id
                }).then(function (res) {
                    if (x.isMount)
                        x.setState({
                            value: res,
                        });
                });
            else
                return Promise.resolve(x.setState({
                    value: "?",
                }));
        });
    }

    readPermissions() {
        let x = this;
        return apicall("getAtomPermissions", {
            group_id: this.props.group_id,
            atom_id: this.props.atom_id
        }).then(function (res) {
            if (x.isMount)
                x.setState({
                    permissions: res
                });
        });
    }

    write(value) {
        apicall("writeAtom", {
            group_id: this.props.group_id,
            atom_id: this.props.atom_id,
            value: value
        }).then(this.readValue());
    }

    componentWillUnmount() {
        this.isMount = false;
        clearInterval(this.slowTimer);
        clearInterval(this.fastTimer);
        this.setState({
            value: null,
            permissions: null
        });
    }

    refresh() {
        this.readPermissions();
    }

    refreshLive() {
        this.readValue();
    }

    render() {
        return (
            <AtomView
                value={this.state.value}
                permissions={this.state.permissions}
                lazyLoad={this.lazyLoad}
            />
        );
    }
}
