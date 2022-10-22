import { Credentials } from '../types/Credentials';
import { Flight } from '../types/Flight';
import { BoundingBox } from './BoundingBox';
export declare class OpenSkyApi {
    private static HOST;
    private static API_ROOT;
    private static STATES_URI;
    private static MY_STATES_URI;
    private static FLIGHTS_BY_AIRCRAFT_URI;
    private _axios;
    private authenticated;
    private lastRequestTime;
    constructor(credentials?: Credentials);
    getFlightsByAircraft(icao24: string | null, beginTime: number | null, endTime: number | null): Promise<Flight[]>;
    getStates(time: number | null, icao24: string[] | null, bbox?: BoundingBox | null): Promise<{
        time: number;
        states: import("../types/StateVector").StateVector[];
    }> | null;
    getMyStates(time: number | null, icao24: string[] | null, serials: number[]): Promise<{
        time: number;
        states: import("../types/StateVector").StateVector[];
    }> | null;
    private getOpenSkyStates;
    private getOpenSkyFlightsByAircraft;
    private checkRateLimit;
}
export { BoundingBox } from './BoundingBox';
