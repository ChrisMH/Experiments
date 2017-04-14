import * as React from "react";

import "./Main.css"

interface MainProps
{

}

interface MainState
{

}

export class Main extends React.Component<MainProps, MainState>
{
    render()
    {
        return (
            <div id="main">
                <h1>React Template</h1>
                <span>Time:</span><br/>
                <span>Origin Url:</span><br />
                <span>Root Url:</span><br />
                <span>Version:</span><br />
            </div>
        );
    }
}
