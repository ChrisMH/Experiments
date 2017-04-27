import * as React from "react";
import * as moment from "moment";

import { Zone } from "../Components";

import { AppSettings, getContainer, ZoneService } from "../Services";
import { ZoneDescription } from "../Models";

import "./MainPage.css"
    
interface State
{
    zones: ZoneDescription[];
}

export class MainPage extends React.Component<any, State>
{
    protected appSettings = getContainer().get<AppSettings>(AppSettings);
    protected zoneService = getContainer().get<ZoneService>(ZoneService);

    constructor()
    {
        super();
        this.state = {
            zones: []
        };
    }
    
    componentDidMount(): void
    {
        this.zoneService.getZones().subscribe((value: ZoneDescription) =>
        {
            this.setState((prevState: State) =>
            {
                let nextState = {...prevState};
                nextState.zones = prevState.zones.concat(value);
                return nextState;
            });
        });
    }
    
    render(): JSX.Element
    {
        return ( 
            <div id="main-page">
                {this.state.zones.map((z: ZoneDescription, index: number) =>
                {
                    return <Zone key={`zone-${index}`} desc={z}/>
                })}
            </div>
        );
    }
}
 