
export class ZoneDescription
{
    title: string;
    inputs: ZoneInput[];
    source: ZoneSource;

    constructor(title?: string, inputs?: ZoneInput[], source?: ZoneSource)
    {
        this.title = title || "";
        this.inputs = inputs || [];
        this.source = source || new ZoneSource(); 
    }
}

export class ZoneInput
{
    name: string;
    selected: boolean;

    constructor(name?: string, selected?: boolean)
    {
        this.name = name || "";
        this.selected = selected || false;
    }
}

export class ZoneSource
{
    name: string;

    constructor(name?: string)
    {
        this.name = name || "";
    }
}
