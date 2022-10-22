"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoundingBox = void 0;
class BoundingBox {
    constructor(minLatitude, maxLatitude, minLongitude, maxLongitude) {
        this.checkLatitude(minLatitude);
        this.checkLatitude(maxLatitude);
        this.checkLongitude(minLongitude);
        this.checkLongitude(maxLongitude);
        this.minLatitude = minLatitude;
        this.minLongitude = minLongitude;
        this.maxLatitude = maxLatitude;
        this.maxLongitude = maxLongitude;
    }
    checkLatitude(lat) {
        if (lat < -90 || lat > 90)
            throw new Error(`Illegal latitude ${lat}. Must be within [-90, 90]`);
    }
    checkLongitude(lon) {
        if (lon < -180 || lon > 180)
            throw new Error(`Illegal longitude ${lon}. Must be within [-180, 180]`);
    }
}
exports.BoundingBox = BoundingBox;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmRpbmdCb3guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL0JvdW5kaW5nQm94LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLE1BQWEsV0FBVztJQU10QixZQUNFLFdBQW1CLEVBQ25CLFdBQW1CLEVBQ25CLFlBQW9CLEVBQ3BCLFlBQW9CO1FBRXBCLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFbEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDakMsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7SUFDbkMsQ0FBQztJQUVPLGFBQWEsQ0FBQyxHQUFXO1FBQy9CLElBQUksR0FBRyxHQUFHLENBQUMsRUFBRSxJQUFJLEdBQUcsR0FBRyxFQUFFO1lBQ3ZCLE1BQU0sSUFBSSxLQUFLLENBQUMsb0JBQW9CLEdBQUcsNEJBQTRCLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBRU8sY0FBYyxDQUFDLEdBQVc7UUFDaEMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUc7WUFDekIsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQkFBcUIsR0FBRyw4QkFBOEIsQ0FBQyxDQUFDO0lBQzVFLENBQUM7Q0FDRjtBQWhDRCxrQ0FnQ0MifQ==