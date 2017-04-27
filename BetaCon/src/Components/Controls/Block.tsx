import * as React from "react";


export interface BlockOutput
{
    title: string;
    drawLine: boolean;
    bold: boolean;
}

export interface BlockProps
{
    x: number;
    y: number;
    width: number;
    height: number;
    rectHeightPct: number; // Expressed as a percentage
    distanceToNext: number;

    title: string[];
    outputs: BlockOutput[];
}

export class Block
{
    constructor(protected props: BlockProps) {}

    onClick(e: any)
    {
        console.log("onClick");

    }

    render(): JSX.Element[]
    {
        let result = new Array<JSX.Element>();
        
        // Title
        const titleHeight = 40;
        const titleX = Math.round(this.props.x + this.props.width / 2); 
        let titleY = this.props.title.length === 1 ? 20 : 10;

        const titleSpace = 18;

        const title1Y = this.props.y + 10;
        const title2Y = this.props.y + 26;

        this.props.title.forEach((t: string) =>
        {            
            result.push(<text x={titleX} y={titleY} textAnchor="middle" alignmentBaseline="central">{t}</text>);
            titleY += titleSpace;
        });

        
        // Rect

        const rectHeight =  Math.round((this.props.height - titleHeight) * this.props.rectHeightPct);
        const rectYCenter = titleHeight + Math.round((this.props.height - titleHeight) / 2);

        const rectX = this.props.x;
        const rectY = rectYCenter - Math.round(rectHeight / 2);

        result.push(<rect onClick={this.onClick.bind(this)} x={rectX} y={rectY} width={this.props.width} height={rectHeight} fill="none" stroke="black" strokeWidth="1" shapeRendering="crispEdges"/>);

        // Outputs

        const outputSpace = 22;

        let outputY = Math.round(rectYCenter - ((this.props.outputs.length - 1) * outputSpace / 2));

        this.props.outputs.forEach((o: BlockOutput) =>
        {
            result.push(<text x={titleX} y={outputY} fontWeight={o.bold ? "bold" : "normal"} textAnchor="middle" alignmentBaseline="central">{o.title}</text>);
            if(o.drawLine)
                result.push(<line x1={this.props.x + this.props.width} y1={outputY} 
                                  x2={this.props.x + this.props.width + this.props.distanceToNext - 10} y2={outputY} 
                                  markerEnd="url(#arrow)"
                                  stroke="black" strokeWidth="1" shapeRendering="crispEdges"/>);
            outputY += outputSpace;
        });

        return result;
    }
}



                    

