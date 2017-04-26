import * as React from "react";
import * as moment from "moment";

import { Zone } from "../Components";

import { AppSettings, getContainer, ZoneService } from "../Services";
import { ZoneDescription } from "../Models";

import "./MainPage.css"
    
interface State
{
    zones: ZoneDescription[]
}

export class MainPage extends React.Component<any, State>
{
    protected appSettings = getContainer().get<AppSettings>(AppSettings);
    protected zoneService = getContainer().get<ZoneService>(ZoneService);

    constructor()
    {
        super();
        this.setState({ zones: [] });
    }

    componentDidMount(): void
    {
        // this.zoneService.getZones().subscribe((value: ZoneDescription) =>
        // {
        //     this.setState((prevState: State) =>
        //     {
        //         let nextState = {...prevState};
        //         nextState.zones = prevState.zones.slice();
        //         nextState.zones.push(value);
        //         return nextState;
        //     });
        // });
    }
 
    render(): JSX.Element
    {
        return ( 
            <div id="main-page">
                <Zone key="zone-1" desc={new ZoneDescription("Zone 1: 4 Input Source (#2 selected), 2 Level Paging, ANC, Biamp Output")}/>
                <Zone key="zone-2" desc={new ZoneDescription("Zone 2: 3 Input Source, 1 Level Paging, ANC, Single Output")}/>

                {/*{
                    this.state.zones.map((z: ZoneDescription, index: number) =>
                    {
                        <Zone key={`zone-${index}`} desc={z}></Zone>
                    })
                }*/}
            </div>
        );
    }
}
 