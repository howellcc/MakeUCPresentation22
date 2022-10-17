import { DegreesTrue, getBearing, getDistance, NauticalMiles, Position } from "aviation-math";
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
         let incomingAircraftCount: number = 0;
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

               let bearingDiff: number = Math.abs(
                  aircraftState.heading - bearingToUs
               );

               if (bearingDiff < 5) {
                  incomingAircraftCount++;
                  aircraftInfo += `${aircraftState.icao24} - ${aircraftState.callsign}\n`;

                  //Calculate distance
                  const distanceNautMi: NauticalMiles = getDistance(
                     aircraftPosition,
                     this.ourLocation
                  );
                  const distanceMiles = distanceNautMi / 1.151; //1 nauticalMile == 1.151 miles
                  aircraftInfo += `Distance: ${distanceMiles.toFixed(
                     1
                  )} miles\n`;
                  aircraftInfo += `Velocity: ${aircraftState.velocity} m/s\n`;

                  //Calculate ETA
                  const estimatedFlightTimeS =
                     (distanceNautMi * 1852) / aircraftState.velocity; //1852 m == 1 nautical mile
                  let asOfTime_ms = asOfTime.getTime();
                  const ETA = new Date(
                     asOfTime_ms + 1000 * estimatedFlightTimeS
                  );
                  const now = new Date();
                  let secondsFromNow: number =
                     (ETA.getTime() - now.getTime()) / 1000;

                  aircraftInfo += `ETA: ${ETA.toLocaleString()} - (${secondsFromNow.toFixed(
                     0
                  )} seconds from now)\n`;
               }
               aircraftInfo += "\n";
            }
         });

         let logString = `${aircraftStates.length} Aircraft Found\n`;
         logString += `${
            aircraftStates.length - flyingAircraftCount
         } On The Ground\n`;
         logString += `${flyingAircraftCount} In The Air\n`;
         logString += `${incomingAircraftCount} Heading Our Way\n\n`;
         logString += `${aircraftInfo}`;
         console.log(logString);
      });
   }
}

let objMain = new Main();
