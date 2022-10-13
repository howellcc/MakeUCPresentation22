import { BoundingBox, OpenSkyApi } from "opensky-api";
import { Credentials } from "opensky-api/build/main/types/Credentials";
import { StateVector } from "opensky-api/build/main/types/StateVector";

import * as openskyConfig from "./opensky-config.json";

class Main {
   private api: OpenSkyApi;

   constructor() {
      try {
         //authenticated
         const creds: Credentials = {
            username: openskyConfig.username,
            password: openskyConfig.password,
         };
         this.api = new OpenSkyApi(creds);
      } catch (ex) {
         //unauthenticated
         this.api = new OpenSkyApi();
      }

      const bounds = new BoundingBox(39.04, 39.3, -84.71, -84.25);

      this.api.getStates(null, null, bounds)?.then((statesobj) => {
         const time: number = statesobj.time;
         const states: Array<StateVector> = statesobj.states;

         console.log(states);
         let x = 1;
         x = x + 1;
      });
   }
}

let objMain = new Main();
