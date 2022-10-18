import { DegreesTrue, getBearing, Position } from "aviation-math";
import { BoundingBox, OpenSkyApi } from "opensky-api";
import { Credentials } from "opensky-api/build/main/types/Credentials";
import { StateVector } from "opensky-api/build/main/types/StateVector";

import * as openskyConfig from "../../opensky-config.json";

class Main {
   private api: OpenSkyApi;
   private readonly ourLocation: Position = new Position(39.1329, -84.516); // UC
   //private readonly ourLocation: Position = new Position(39.1044,-84.4198); // Lunken
   //private readonly ourLocation: Position = new Position(39.0508, -84.6603); // CVG

   //Bounding box for I-275
   private readonly lowerleft: Position = new Position(39.0473, -84.718);
   private readonly upperright: Position = new Position(39.3017, -84.2525);

   //Larger Bounding box
   // private readonly lowerleft: Position = new Position(38.8053, -85.1871);
   // private readonly upperright: Position = new Position(39.4462, -83.8290);

   constructor() {
      if (
         openskyConfig.username.length > 0 &&
         openskyConfig.password.length > 0
      ) {
         //authenticated
         const creds: Credentials = {
            username: openskyConfig.username,
            password: openskyConfig.password,
         };
         this.api = new OpenSkyApi(creds);
      } else {
         //unauthenticated
         this.api = new OpenSkyApi();
      }

      const bounds = new BoundingBox(
         this.lowerleft.lat,
         this.upperright.lat,
         this.lowerleft.lon,
         this.upperright.lon
      );

      this.api.getStates(null, null, bounds)?.then((statesobj) => {
         const epochTime: number = statesobj.time;
         const aircraftStates: Array<StateVector> = statesobj.states;

         //Display the Datetime of the data
         let asOfTime = new Date(0);
         asOfTime.setUTCSeconds(epochTime);
         console.log(asOfTime.toLocaleString());

         let flyingAircraftCount: number = 0;
         let aircraftInfo: string = "";

         //Loop over aircraft
         aircraftStates.forEach((aircraftState) => {
            //Flying aircraft only
            if (!aircraftState.onGround) {
               flyingAircraftCount++;

               const aircraftPosition = new Position(
                  aircraftState.latitude,
                  aircraftState.longitude
               );

               //Calculate bearing to our location
               const bearingToUs: DegreesTrue = getBearing(
                  aircraftPosition,
                  this.ourLocation
               );

               aircraftInfo += `${aircraftState.icao24} - ${aircraftState.callsign}\n`;

               let bearingDiff: number = Math.abs(
                  aircraftState.heading - bearingToUs
               );

               //very rough approximation.
               if (bearingDiff < 5) {
                  aircraftInfo += "Headed toward us: YES\n";
               } else {
                  aircraftInfo += "Headed toward us: NO\n";
                  aircraftInfo += `Bearing Diff: ${bearingDiff.toFixed(2)}\n`;
               }
               aircraftInfo += "\n";
            }
         });

         console.log(
            `${flyingAircraftCount} Aircraft Found!\n\n${aircraftInfo}`
         );
      });
   }
}

let objMain = new Main();
