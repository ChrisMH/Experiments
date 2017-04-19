import * as React from "react";

export class BlockProps
{
    x: number;
    y: number;
    width: number;
    height: number;
}

export class Block extends React.Component<BlockProps, any>
{
    render(): JSX.Element
    {
        return (
            <rect x={this.props.x} y={this.props.y} width={this.props.width} height={this.props.height} />
        );
    }
}
