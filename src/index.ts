import { exit } from "process";

import { OpenSkyAPIService } from "./opensky/opensky-api.service";

class Main {
   private _srvc: OpenSkyAPIService;

   constructor() {
      this._srvc = new OpenSkyAPIService();

      try {
         this._srvc.tryLoadCredentials();
      } catch (ex) {
         console.log(`Error: ${ex}`);
         exit(1);
      }

      console.log("woooo success");
   }
}

let objMain = new Main();
