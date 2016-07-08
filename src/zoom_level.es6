import * as worldValues from './world_values';
import * as mercProj from './mercator_projection';

class ZoomLevel {

    constructor(zoomLevel) {
        this.zoom = zoomLevel;
        this.matrixSideSize = Math.pow(2, this.zoom);
        this.horizontalMapTileSize = worldValues.EQUATOR / this.matrixSideSize;
        this.verticalMapTileSize = (2 * worldValues.MERIDIAN) / this.matrixSideSize;
        this.mercatorProjection = new mercProj.MercatorProjection();
    }

    getXYOfTileContainingPoint(x, y, projectionType) {
        let res = null;
        if (projectionType == worldValues.PROJECTION_TYPE_WEBMERCATOR) {
            res = this.mercatorProjection.getTileXYForMercatorPoint(x, y);
        } else if (projectionType == worldValues.PROJECTION_TYPE_WGS84) {
            res = this.mercatorProjection.getTileXYForWGS84Point(x, y);
        }
        return res;
    }

    getTileXYForWGS84Point(geoPoint) {
        if (geoPoint.lon < -179.999999 || geoPoint.lon > 179.999999 || geoPoint.lat < -85.0511 || geoPoint.lat > 85.0511) {
            throw "TILES_COORD_OUT_OF_RANGE";
        }
        let mercPoint = this.mercatorProjection.convertGeoToMerc(geoPoint);
        return this.getTileXYForMercatorPoint(mercPoint);
    }

    getTileXYForMercatorPoint(mercPoint) {
        let tileXY = {"x": 0, "y": 0};
        tileXY.x = Math.floor((mercPoint.east + (worldValues.EQUATOR / 2.0)) / this.horizontalMapTileSize);
        tileXY.y = Math.floor((worldValues.MERIDIAN - mercPoint.north) / this.verticalMapTileSize);
        return tileXY;
    }


//Mercator coordinates stretch from -20037508.34 to 20037508.34 in each direction.
    getMercatorExtentForTile(x, y) {
        let minEast = (x * this.horizontalMapTileSize) - (worldValues.EQUATOR / 2.0);
        let maxEast = ((x + 1.0) * this.horizontalMapTileSize) - (worldValues.EQUATOR / 2.0);
        let maxNorth = worldValues.MERIDIAN - (y * this.verticalMapTileSize);
        let minNorth = worldValues.MERIDIAN - ((y + 1.0) * this.verticalMapTileSize);
        return {"minEast": minEast, "maxEast": maxEast, "minNorth": minNorth, "maxNorth": maxNorth};
    }

    getWGS84ExtentForTile(x, y) {
        let mercExtent = this.getMercatorExtentForTile(x, y);
        let maxMerc = {"north": mercExtent.maxNorth, "east": mercExtent.maxEast};
        let minMerc = {"north" : mercExtent.minNorth, "east": mercExtent.minEast};
        let maxGeo = {}
        let minGeo = this.mercatorProjection.convertMercToGeo(minMerc);
        return "not yet implemented";
    }

    getZoomLevelCardinality() {
        return Math.pow(this.matrixSideSize, 2);
    }

}

let zoomLevel = new ZoomLevel(10);
console.log(zoomLevel.getZoomLevelCardinality());
let p = {"lon": 10, "lat": 45};
console.log("Geo point: ", p)
let mp = zoomLevel.mercatorProjection.convertGeoToMerc(p);
console.log("Converted mercator point: ", mp);
let gp = zoomLevel.mercatorProjection.convertMercToGeo(mp);
console.log("Re-converted geo point: ", gp);
let xy = zoomLevel.getTileXYForWGS84Point(p);
console.log("Tiles coord: ", xy);
let mercatorExtent = zoomLevel.getMercatorExtentForTile(xy.x, xy.y)
console.log("Mercator extent: ", mercatorExtent);