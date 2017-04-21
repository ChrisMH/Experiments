import * as React from "react";
import * as Measure from "react-measure";

import { Block, BlockProps, InputSetupBlock, SourceSelectorBlock } from "../../Components";

import "./SignalPath.css";

interface SignalPathBlocksProps
{
}

interface SignalPathBlocksState
{
    width: number;
    height: number;
}

export class SignalPathBlocks extends React.Component<SignalPathBlocksProps, SignalPathBlocksState>
{
    constructor()
    {
        super();
        this.state = { width: 0, height: 0};
    }

    render(): JSX.Element
    {
        const blockCount = 6;     
        const betweenSpace = Math.round((this.state.width * 0.30) / (blockCount - 1));
        const blockWidth = Math.round((this.state.width - ((blockCount - 1) * betweenSpace)) / 6);
        
        const blockHeight = this.state.height;

        const blocks = new Array<BlockProps>();
        for(let i = 0 ; i < blockCount ; i++ )
        {
            blocks.push({ 
                x: i * (betweenSpace + blockWidth),
                y: 0, 
                width: blockWidth, 
                height: blockHeight 
            });

            console.log(blocks[blocks.length - 1]);
        }

        const viewBox = `0 0 ${this.state.width} ${this.state.height}`;

        return (
            <Measure onMeasure={(dims: Measure.Dimensions) => { this.setState({width: dims.width, height: dims.height})}}>
                <svg width={this.state.width} height={this.state.height}viewBox={viewBox}>
                    <InputSetupBlock x={blocks[0].x} y={blocks[0].y} width={blocks[0].width} height={blocks[0].height}/>                    
                    <SourceSelectorBlock x={blocks[1].x} y={blocks[1].y} width={blocks[1].width} height={blocks[1].height}/>
                    {/*{ blocks.map((block: BlockProps, index: number) =>
                    {
                        return (<Block key={index} x={block.x} y={block.y} width={block.width} height={block.height} />);
                    })}*/}
                    
                    <line x1={blocks[0].x + blocks[0].width} y1="70" x2={blocks[1].x} y2="70" stroke="black" strokeWidth="2" />
                    <line x1={blocks[0].x + blocks[0].width} y1="90" x2={blocks[1].x} y2="90" stroke="black" strokeWidth="2" />
                    <line x1={blocks[0].x + blocks[0].width} y1="110" x2={blocks[1].x} y2="110" stroke="black" strokeWidth="2" />
                    <line x1={blocks[0].x + blocks[0].width} y1="130" x2={blocks[1].x} y2="130" stroke="black" strokeWidth="2" />
                </svg>
            </Measure>
        );
    }
}
