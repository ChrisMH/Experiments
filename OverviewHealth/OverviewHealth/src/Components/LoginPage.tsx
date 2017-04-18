import * as React from "react";

import { HeaderBranding, HeaderVersion } from "../Components";

export class LoginPage extends React.Component<any, any>
{
    render(): JSX.Element
    {
        return (
            <div className="login-page">
                <header className="main">
                    <HeaderBranding/>
                    <HeaderVersion/>
                </header>
                <section className="main">
                </section>
            </div>
        );
    }
}
