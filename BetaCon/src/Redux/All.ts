import { Action } from "redux";
import { ActionsObservable } from "redux-observable";

import { ZoneDescription } from "../Models";

enum ZoneActionTypes
{
    GET_ZONES,
    GET_ZONES_FULFILLED,
    GET_ZONES_ERROR
};

const getZones = () => ({type: ZoneActionTypes.GET_ZONES});
const getZonesFulfilled = (zones: Array<ZoneDescription>) => ({type: ZoneActionTypes.GET_ZONES_FULFILLED, payload: zones});
const getZonesError = (error: Error) => ({type: ZoneActionTypes.GET_ZONES_ERROR, payload: error});

const getZonesEpic = (action$: ActionsObservable<ZoneDescription>) =>
{
    action$.ofType(ZoneActionTypes.GET_ZONES)
        .mergeMap(action =>
        {
            
        });
}

