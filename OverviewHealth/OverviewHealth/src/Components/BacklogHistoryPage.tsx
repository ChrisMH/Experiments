import * as React from "react";

import { HeaderAccount, HeaderBranding, HeaderVersion } from "../Components";

export class BacklogHistoryPage extends React.Component<any, any>
{
    render(): JSX.Element
    {
        return (
            <div className="backlog-history-page">
                <header className="main">
                    <HeaderAccount/>
                    <HeaderBranding/>
                    <HeaderVersion/>
                </header>
                <section className="main">
                </section>
            </div>
        );
    }
}
