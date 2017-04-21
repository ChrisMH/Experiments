import * as React from "react";

import { BlockProps } from "./Block";

export class SourceSelectorBlock extends React.Component<BlockProps, any>
{
    render(): JSX.Element
    {
        const viewBox = `0 0 ${this.props.width} ${this.props.height}`;

        return (
            <svg x={this.props.x} y={this.props.y} width={this.props.width} height={this.props.height}>
                <text x={this.props.width / 2} y={10} textAnchor="middle" alignmentBaseline="central">Source</text>
                <text x={this.props.width / 2} y={26} textAnchor="middle" alignmentBaseline="central">Selector</text>
                <rect x={0} y={40} width={this.props.width} height={this.props.height - 40} fill="none" stroke="black" strokeWidth="2" />
            </svg>
        );
    }
}
 