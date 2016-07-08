import * as projection from './world_values';

class MercatorProjection {

    constructor() {
        this.pi = Math.acos(-1);
    }

    convertGeoToMerc(geoP) {
        let mercP = {"north": 0, "east": 0};
        let radLat = this.toRadians(geoP.lat);
        let radLon = this.toRadians(geoP.lon);
        mercP.north = 0.5 * Math.log((1 + Math.sin(radLat)) / (1 - Math.sin(radLat))) * projection.WGS84_SPHERICAL_AXIS;
        mercP.east = radLon * projection.WGS84_SPHERICAL_AXIS;
        return mercP;
    }

    convertMercToGeo(mercP) {
        let mercG = {"lat": 0, "lon": 0};
        mercG.lon = this.toDegree(mercP.east / projection.WGS84_SPHERICAL_AXIS);
        mercG.lat = this.toDegree(2 * Math.atan(Math.exp(mercP.north / projection.WGS84_SPHERICAL_AXIS)) - 0.5 * Math.PI);
        return mercG;
    }

    getUpperRightExtent(coordinates) {
        let xs;
        let ys;
        for (let i = 0; i < coordinates.length; i++) {
            xs[i] = coords[i].x;
            ys[i] = coords[i].y;
        }

        let maxX = getMax(xs);
        let maxY = getMax(ys);
        return [{"x": maxX, "y": maxY}];
    }

    getLowerLeftExtent(coords) {
        let xs = new double[coords.length];
        let ys = new double[coords.length];
        for (let i = 0; i < coords.length; i++) {
            xs[i] = coords[i].x;
            ys[i] = coords[i].y;
        }

        let minX = getMin(xs);
        let minY = getMin(ys);
        return [{"x": minX, "y": minY}];
    }

    getMin(vals) {
        let min = 999999;
        for (let d in vals) {
            min = (d < min ? d : min);
        }
        return min;
    }

    getMax(vals) {
        let max = -999999;
        for (let d in vals) {
            max = (d > max ? d : max);
        }
        return max;
    }

    toRadians(degree) {
        return degree * (this.pi / 180);
    }

    toDegree(radians) {
        return radians * (180 / this.pi);
    }
}

export {MercatorProjection};


