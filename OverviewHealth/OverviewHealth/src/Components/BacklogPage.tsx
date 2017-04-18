import * as React from "react";

import { HeaderAccount, HeaderBranding, HeaderVersion } from "../Components";

export class BacklogPage extends React.Component<any, any>
{
    render(): JSX.Element
    {
        return (
            <div className="backlog-page">
                <header className="main">
                    <HeaderBranding/>
                    <HeaderAccount/>
                    <HeaderVersion/>
                </header>
                <section className="main">
                </section>
            </div>
        );
    }
} 
