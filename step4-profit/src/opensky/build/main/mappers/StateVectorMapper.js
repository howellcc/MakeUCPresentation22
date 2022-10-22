"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stateVectorMapper = void 0;
exports.stateVectorMapper = (raw) => {
    if (!raw || !Array.isArray(raw)) {
        throw new Error('StateVectorMapper requires input array');
    }
    return {
        icao24: raw[0],
        callsign: raw === null || raw === void 0 ? void 0 : raw[1].trim(),
        originCountry: raw[2],
        lastPositionUpdate: raw[3],
        lastContact: raw[4],
        longitude: raw[5],
        latitude: raw[6],
        baroAltitude: raw[7],
        onGround: raw[8],
        velocity: raw[9],
        heading: raw[10],
        verticalRate: raw[11],
        serials: raw[12],
        geoAltitude: raw[13],
        squawk: raw[14],
        spi: raw[15],
        positionSource: raw[16],
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhdGVWZWN0b3JNYXBwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbWFwcGVycy9TdGF0ZVZlY3Rvck1hcHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFYSxRQUFBLGlCQUFpQixHQUFHLENBQUMsR0FBVSxFQUFlLEVBQUU7SUFDM0QsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDL0IsTUFBTSxJQUFJLEtBQUssQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO0tBQzNEO0lBRUQsT0FBTztRQUNMLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2QsUUFBUSxFQUFFLEdBQUcsYUFBSCxHQUFHLHVCQUFILEdBQUcsQ0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFFO1FBQ3pCLGFBQWEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLGtCQUFrQixFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFMUIsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDbkIsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDakIsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDaEIsWUFBWSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDcEIsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDaEIsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDaEIsT0FBTyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFFaEIsWUFBWSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFDckIsT0FBTyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFDaEIsV0FBVyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFDcEIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFDZixHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQztRQUNaLGNBQWMsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDO0tBQ3hCLENBQUM7QUFDSixDQUFDLENBQUMifQ==