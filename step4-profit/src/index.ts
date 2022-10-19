import * as openskyConfig from "../../opensky-config.json";
import { OpenSkyApi } from "./opensky/build/main";
import { Credentials } from "./opensky/build/main/types/Credentials";
import { Flight } from "./opensky/build/main/types/Flight";

class Main {
   private api: OpenSkyApi;
   private readonly elonsPlane: string = "a835af";

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

      let now = new Date();
      let nowS = Math.round(now.getTime() / 1000); //1000ms in 1s

      let oneWeekAgo = new Date();
      oneWeekAgo.setDate(now.getDate() - 7); //7 days ago
      let oneWeekAgoS: number = Math.round(oneWeekAgo.getTime() / 1000);

      this.api
         .getFlightsByAircraft(this.elonsPlane, oneWeekAgoS, nowS)
         ?.then((flights: Flight[]) => {
            console.log(`${new Date()}`);

            //Output # of aircraft found
            console.log(`${flights.length} Flights Found\n`);

            if (flights.length > 0) {
               var treeify = require("treeify");
               console.log(treeify.asTree(flights, true));
            }
         });
   }
}

let objMain = new Main();
