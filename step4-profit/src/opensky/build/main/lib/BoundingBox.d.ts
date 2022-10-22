export declare class BoundingBox {
    minLatitude: number;
    minLongitude: number;
    maxLatitude: number;
    maxLongitude: number;
    constructor(minLatitude: number, maxLatitude: number, minLongitude: number, maxLongitude: number);
    private checkLatitude;
    private checkLongitude;
}
