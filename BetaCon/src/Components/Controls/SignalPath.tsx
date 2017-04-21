import * as React from "react";
import * as Measure from "react-measure";

import { SignalPathBlocks } from "../../Components";

import "./SignalPath.css";

interface SignalPathProps
{
    id: string;
    title: string;
}

interface SignalPathState
{
    width: number;
    height: number;
}

export class SignalPath extends React.Component<SignalPathProps, SignalPathState>
{
    constructor()
    {
        super();
        this.state = { width: 0, height: 0};
    }

    render(): JSX.Element
    {
        return (
            <Measure onMeasure={(dims: Measure.Dimensions) => { this.setState({width: dims.width, height: dims.height})}}>
                <div className="signal-path" id={this.props.id} >
                    <div>{this.props.title}</div>
                    <SignalPathBlocks/>
                </div>
            </Measure>
        );
    }
}
  