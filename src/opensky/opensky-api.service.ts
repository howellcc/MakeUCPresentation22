import * as openskyConfig from "./opensky-config.json";

export class OpenSkyAPIService {
   private readonly _APIUrl: string = "https://opensky-network.org/api/";
   private readonly _allStateVectorsEndpoint: string = "states/all/";
   private readonly _flightsByAircraftEndpoint: string = "flights/aircraft/";
   private readonly _flightsInTimeIntervalEndpoint: string = "flights/all";
   private readonly _configFileName: string = "opensky-config.json";
   private _username: string;
   private _password: string;

   constructor() {
      this._username = "";
      this._password = "";
   }

   tryLoadCredentials() {
      try {
         if (
            openskyConfig.username != null &&
            openskyConfig.username.length > 0
         ) {
            this._username = openskyConfig.username;
            this._password = openskyConfig.password;
         }
      } catch (ex) {
         throw "Unable to load credentials.";
      }
   }

   go(): string {
      let requesturl: string = this._username + this._password;
      return requesturl;
   }
}
