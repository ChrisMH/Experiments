import * as React from "react";

import { Block } from "../../Components";

import "./SignalPath.css";

interface SignalPathProps
{
    id: string;
}

export class SignalPath extends React.Component<SignalPathProps, any>
{
    render(): JSX.Element
    {
        return (
            <svg className="signal-path" id={this.props.id} viewBox="0 0 600 200" >
                <Block x={10} y={10} width={200} height={180}/>
                <Block x={230} y={10} width={200} height={180}/>
            </svg>
        );
    }
}
