import { Position } from "aviation-math";
import { BoundingBox, OpenSkyApi } from "opensky-api";
import { Credentials } from "opensky-api/build/main/types/Credentials";
import { StateVector } from "opensky-api/build/main/types/StateVector";

import * as openskyConfig from "../../opensky-config.json";

class Main {
   private api: OpenSkyApi;

   //Bounding box for UC
   private readonly lowerleft: Position = new Position(39.1285, -84.5206);
   private readonly upperright: Position = new Position(39.1354, -84.5107);

   //Bounding box for I-275
   // private readonly lowerleft: Position = new Position(39.0473, -84.718);
   // private readonly upperright: Position = new Position(39.3017, -84.2525);

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

         //Output # of aircraft found
         console.log(`${aircraftStates.length} Aircraft Found!\n`);

         if (aircraftStates.length > 0) {
            var treeify = require("treeify");
            console.log(treeify.asTree(aircraftStates, true));
         }
      });
   }
}

let objMain = new Main();
