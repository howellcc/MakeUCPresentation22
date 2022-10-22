'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoundingBox = exports.OpenSkyApi = void 0;
const axios_1 = __importDefault(require("axios"));
const iso_url_1 = require("iso-url");
const StateVectorMapper_1 = require("../mappers/StateVectorMapper");
const axiosConfig = {
    timeout: 5000,
    headers: { 'User-Agent': 'OpenSkyApi-TS/1.0' },
};
class OpenSkyApi {
    constructor(credentials) {
        this.authenticated = false;
        this.lastRequestTime = {
            GET_STATES: null,
            GET_MY_STATES: null,
            GET_FLIGHTS: null,
        };
        if ((credentials === null || credentials === void 0 ? void 0 : credentials.username) && (credentials === null || credentials === void 0 ? void 0 : credentials.password)) {
            axiosConfig.auth = {
                username: credentials === null || credentials === void 0 ? void 0 : credentials.username,
                password: credentials === null || credentials === void 0 ? void 0 : credentials.password,
            };
            this.authenticated = true;
        }
        this._axios = axios_1.default.create(axiosConfig);
    }
    getFlightsByAircraft(icao24, beginTime, endTime) {
        const nvps = [];
        if (beginTime) {
            nvps.push({ begin: String(beginTime) });
        }
        if (endTime) {
            nvps.push({ end: String(endTime) });
        }
        if (icao24) {
            nvps.push({ icao24: icao24 });
        }
        return this.getOpenSkyFlightsByAircraft(OpenSkyApi.FLIGHTS_BY_AIRCRAFT_URI, nvps);
    }
    getStates(time, icao24, bbox) {
        const nvps = [];
        if (time) {
            nvps.push({ time: String(time) });
        }
        icao24 === null || icao24 === void 0 ? void 0 : icao24.forEach((i) => {
            nvps.push({ icao24: i });
        });
        if (bbox) {
            nvps.push({ lamin: String(bbox.minLatitude) });
            nvps.push({ lamax: String(bbox.maxLatitude) });
            nvps.push({ lomin: String(bbox.minLongitude) });
            nvps.push({ lomax: String(bbox.maxLongitude) });
        }
        if (this.checkRateLimit('GET_STATES', 4900, 9900)) {
            return this.getOpenSkyStates(OpenSkyApi.STATES_URI, nvps);
        }
        return null;
    }
    getMyStates(time, icao24, serials) {
        if (!this.authenticated) {
            throw new Error("Anonymous access of 'myStates' not allowed");
        }
        const nvps = [];
        if (time) {
            nvps.push({ time: String(time) });
        }
        icao24 === null || icao24 === void 0 ? void 0 : icao24.forEach((i) => {
            nvps.push({ icao24: i });
        });
        serials === null || serials === void 0 ? void 0 : serials.forEach((s) => {
            nvps.push({ serials: String(s) });
        });
        if (this.checkRateLimit('GET_MY_STATES', 900, 0)) {
            return this.getOpenSkyStates(OpenSkyApi.MY_STATES_URI, nvps);
        }
        return null;
    }
    async getOpenSkyStates(url, nvps) {
        var _a;
        const params = new iso_url_1.URLSearchParams();
        nvps.forEach((i) => {
            for (const [key, value] of Object.entries(i)) {
                params.append(key, value);
            }
        });
        const { data } = await this._axios.get(url, {
            params,
        });
        const states = ((_a = data === null || data === void 0 ? void 0 : data.states) === null || _a === void 0 ? void 0 : _a.map((state) => StateVectorMapper_1.stateVectorMapper(state))) || [];
        return {
            time: data.time,
            states,
        };
    }
    async getOpenSkyFlightsByAircraft(url, nvps) {
        const params = new iso_url_1.URLSearchParams();
        nvps.forEach((i) => {
            for (const [key, value] of Object.entries(i)) {
                params.append(key, value);
            }
        });
        try {
            const data = await this._axios.get(url, {
                params,
            });
            if (Array.isArray(data === null || data === void 0 ? void 0 : data.data)) {
                return data.data;
            }
        }
        catch (x) { }
        return new Array();
    }
    checkRateLimit(type, timeDiffAuth, timeDiffNoAuth) {
        const t = this.lastRequestTime[type];
        const now = Date.now();
        this.lastRequestTime[type] = now;
        return (t == null ||
            (this.authenticated && now - t > timeDiffAuth) ||
            (!this.authenticated && now - t > timeDiffNoAuth));
    }
}
exports.OpenSkyApi = OpenSkyApi;
OpenSkyApi.HOST = 'opensky-network.org';
OpenSkyApi.API_ROOT = `https://${OpenSkyApi.HOST}/api`;
OpenSkyApi.STATES_URI = `${OpenSkyApi.API_ROOT}/states/all`;
OpenSkyApi.MY_STATES_URI = `${OpenSkyApi.API_ROOT}/states/own`;
OpenSkyApi.FLIGHTS_BY_AIRCRAFT_URI = `${OpenSkyApi.API_ROOT}/flights/aircraft`;
var BoundingBox_1 = require("./BoundingBox");
Object.defineProperty(exports, "BoundingBox", { enumerable: true, get: function () { return BoundingBox_1.BoundingBox; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3BlblNreUFwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvT3BlblNreUFwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUE7Ozs7OztBQUVaLGtEQUF3RDtBQUN4RCxxQ0FBeUM7QUFFekMsb0VBQWdFO0FBUWhFLE1BQU0sV0FBVyxHQUF1QjtJQUN0QyxPQUFPLEVBQUUsSUFBSTtJQUNiLE9BQU8sRUFBRSxFQUFFLFlBQVksRUFBRSxtQkFBbUIsRUFBRTtDQUMvQyxDQUFBO0FBRUQsTUFBYSxVQUFVO0lBaUJyQixZQUFZLFdBQXlCO1FBUjdCLGtCQUFhLEdBQUcsS0FBSyxDQUFBO1FBRXJCLG9CQUFlLEdBQXVDO1lBQzVELFVBQVUsRUFBRSxJQUFJO1lBQ2hCLGFBQWEsRUFBRSxJQUFJO1lBQ25CLFdBQVcsRUFBRSxJQUFJO1NBQ2xCLENBQUE7UUFHQyxJQUFJLENBQUEsV0FBVyxhQUFYLFdBQVcsdUJBQVgsV0FBVyxDQUFFLFFBQVEsTUFBSSxXQUFXLGFBQVgsV0FBVyx1QkFBWCxXQUFXLENBQUUsUUFBUSxDQUFBLEVBQUU7WUFDbEQsV0FBVyxDQUFDLElBQUksR0FBRztnQkFDakIsUUFBUSxFQUFFLFdBQVcsYUFBWCxXQUFXLHVCQUFYLFdBQVcsQ0FBRSxRQUFRO2dCQUMvQixRQUFRLEVBQUUsV0FBVyxhQUFYLFdBQVcsdUJBQVgsV0FBVyxDQUFFLFFBQVE7YUFDaEMsQ0FBQTtZQUNELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFBO1NBQzFCO1FBRUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxlQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBO0lBQ3pDLENBQUM7SUFFTSxvQkFBb0IsQ0FDekIsTUFBcUIsRUFDckIsU0FBd0IsRUFDeEIsT0FBc0I7UUFFdEIsTUFBTSxJQUFJLEdBQWtDLEVBQUUsQ0FBQTtRQUU5QyxJQUFJLFNBQVMsRUFBRTtZQUNiLElBQUksQ0FBQyxJ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