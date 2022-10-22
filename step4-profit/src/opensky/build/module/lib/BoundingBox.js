export class BoundingBox {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmRpbmdCb3guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL0JvdW5kaW5nQm94LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sT0FBTyxXQUFXO0lBTXRCLFlBQ0UsV0FBbUIsRUFDbkIsV0FBbUIsRUFDbkIsWUFBb0IsRUFDcEIsWUFBb0I7UUFFcEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVsQyxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUNqQyxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztJQUNuQyxDQUFDO0lBRU8sYUFBYSxDQUFDLEdBQVc7UUFDL0IsSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxHQUFHLEVBQUU7WUFDdkIsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQkFBb0IsR0FBRyw0QkFBNEIsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFFTyxjQUFjLENBQUMsR0FBVztRQUNoQyxJQUFJLEdBQUcsR0FBRyxDQUFDLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRztZQUN6QixNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixHQUFHLDhCQUE4QixDQUFDLENBQUM7SUFDNUUsQ0FBQztDQUNGIn0=