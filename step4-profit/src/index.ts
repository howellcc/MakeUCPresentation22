import { exit } from "process";

import * as openskyConfig from "../../opensky-config.json";
import { OpenSkyApi } from "./opensky/build/main";
import { Credentials } from "./opensky/build/main/types/Credentials";
import { Flight } from "./opensky/build/main/types/Flight";

class Main {
   private api: OpenSkyApi;
   private readonly elonsPlane: string = "a835af";

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

      let now = new Date();
      let nowS = Math.round(now.getTime() / 1000);

      let oneWeekAgo = new Date();
      let oneWeekOfMs: number = 1000 * 60 * 60 * 24 * 7; //1000ms * 60s/min * 60min/hr * 24hr/day * 7days;
      let oneWeekAgoS: number = Math.round(
         (oneWeekAgo.getTime() - oneWeekOfMs) / 1000
      );

      this.api
         .getFlightsByAircraft(this.elonsPlane, oneWeekAgoS, nowS)
         ?.then((flights: Flight[]) => {
            console.log(`${new Date()}`);

            //Output # of aircraft found
            console.log(`${flights.length} Flights Found\n`);

            if (flights.length === 0) {
               exit(0);
            } else {
               var treeify = require("treeify");
               console.log(treeify.asTree(flights, true));
            }
         });
   }
}

let objMain = new Main();
