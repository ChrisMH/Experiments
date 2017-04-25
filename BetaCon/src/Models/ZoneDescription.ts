
export class ZoneDescription
{
    title: string;

    constructor(title?: string)
    {
        if(title !== undefined)
            this.title = title;
    }
}
