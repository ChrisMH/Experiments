import * as React from "react";
import * as Measure from "react-measure";

import { ZoneSignalPath } from "../../components";
import { ZoneDescription } from "../../models";

import "./Zone.styl";

interface ZoneProps
{
    desc: ZoneDescription;
}

interface ZoneState
{
    width: number;
    height: number;
}

export class Zone extends React.Component<ZoneProps, ZoneState>
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
                <div className="zone">
                    <div width={this.state.width}>{this.props.desc.title}</div>
                    <ZoneSignalPath desc={this.props.desc} width={this.state.width} height={this.state.height - 28}/>
                </div>
            </Measure>
        );
    }
}
  