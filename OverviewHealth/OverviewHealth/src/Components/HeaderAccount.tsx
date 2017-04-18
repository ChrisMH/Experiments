import * as React from "react";

import "./HeaderAccount.css";

export class HeaderAccount extends React.Component<any, any>
{
    render()
    {
        return (
            <div className="header-account">
                <span className="header-controls-cell header-controls-label logged-in-user">userName</span>
                <button type="button" className="btn btn-default header-controls-cell">Log Out</button>
            </div>
        );
    }
} 
