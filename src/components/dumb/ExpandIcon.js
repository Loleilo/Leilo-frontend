import React from 'react';
import './ExpandIcon.css';

export default function (props) {
    return (
        <button className="expand-icon" onClick={() => props.onExpandToggle()}>{props.expanded ? "▼" : "▶"}</button>
    );
}