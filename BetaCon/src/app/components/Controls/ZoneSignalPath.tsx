import * as React from "react";
import * as Measure from "react-measure";

import { Block, BlockProps, BlockOutput } from "../../components";
import { ZoneDescription, ZoneInput, ZoneSource } from "../../Models";


interface ZoneSignalPathProps
{
    desc: ZoneDescription;
    width: number;
    height: number;
}

interface ZoneSignalPathState
{
}

export class ZoneSignalPath extends React.Component<ZoneSignalPathProps, ZoneSignalPathState>
{
    constructor()
    {
        super();
        //this.state = { width: 0, height: 0};
    }

    render(): JSX.Element
    {
        const blockCount = 6;     
        const betweenSpace = Math.round((this.props.width * 0.30) / (blockCount - 1));
        const blockWidth = Math.round((this.props.width - ((blockCount - 1) * betweenSpace)) / 6) - 2;
        
        const blockHeight = this.props.height - 6;

        const blocks = new Array<BlockProps>();

        for(let i = 0 ; i < blockCount ; i++ )
        {
            blocks.push({ 
                x: i * (betweenSpace + blockWidth) + 2,
                y: 2, 
                width: blockWidth, 
                height: blockHeight,

                rectHeightPct: 1,
                distanceToNext: betweenSpace,

                title: [],
                outputs: []
            });
        }
 
        blocks[0].title = ["Input", "Setup"];
        this.props.desc.inputs.forEach((i: ZoneInput) => blocks[0].outputs.push({title: i.name, drawLine: true, bold: i.selected}));

        blocks[1].title = ["Source", "Selector"];
        blocks[1].outputs = [
            { title: this.props.desc.source.name, drawLine: true, bold: false }
        ];

        blocks[2].title = ["Auto", "Volume"];
        blocks[2].rectHeightPct = .4;        
        blocks[2].outputs = [
            { title: "On / Off", drawLine: true, bold: false }
        ];

        blocks[3].title = ["Zone EQ"];
        blocks[3].rectHeightPct = .4;        
        blocks[3].outputs = [
            { title: "On / Off", drawLine: true, bold: false }
        ];

        blocks[4].title = ["Zone Gain"];
        blocks[4].rectHeightPct = .4;     
        blocks[4].outputs = [
            { title: "+0.0 dB", drawLine: true, bold: false }
        ];

        blocks[5].title = ["Zone", "Configuration"];   
        blocks[5].outputs = [
            { title: "Output 1", drawLine: false, bold: false },
            { title: "Output 2", drawLine: false, bold: false }
        ];
        blocks[5].distanceToNext = 0;


        const viewBox = `0 0 ${this.props.width} ${this.props.height}`;

        //<InputSetupBlock x={blocks[0].x} y={blocks[0].y} width={blocks[0].width} height={blocks[0].height}/>     
        //<SourceSelectorBlock x={blocks[1].x} y={blocks[1].y} width={blocks[1].width} height={blocks[1].height}/>

        return (
            <svg width={this.props.width} height={this.props.height} viewBox={viewBox} preserveAspectRatio="xMidYMid">  
                <marker id="arrow"
                    viewBox="0 0 10 10" refX="0" refY="5" 
                    markerUnits="strokeWidth"
                    markerWidth="20" markerHeight="10"
                    orient="auto">
                    <path d="M 0 0 L 10 5 L 0 10 z" />
                </marker>

                {blocks.map((block: BlockProps, index: number) =>
                    {
                        return new Block(block).render()
                    })
                }
            </svg>
        );
    }
}
