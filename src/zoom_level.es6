import * as worldValues from './world_values';
import * as mercProj from './mercator_projection';
import {logger} from './logger';

class ZoomLevel {

    constructor(zoomLevel) {
        logger.log("New ZoomLevel:  ", zoomLevel);
        this.zoom = Math.floor(zoomLevel);
        this.matrixSideSize = Math.pow(2, this.zoom);
        this.horizontalMapTileSize = worldValues.EQUATOR / this.matrixSideSize;
        this.verticalMapTileSize = (2 * worldValues.MERIDIAN) / this.matrixSideSize;
        this.mercatorProjection = new mercProj.MercatorProjection();
    }

    getXYOfTileContainingPoint(x, y, projectionType) {
        logger.log("getXYOfTileContainingPoint, x, y, projectionType: ", x, y, projectionType);
        let res = null;
        if (projectionType == worldValues.PROJECTION_TYPE_WEBMERCATOR) {
            res = this.mercatorProjection.getTileXYForMercatorPoint(x, y);
        } else if (projectionType == worldValues.PROJECTION_TYPE_WGS84) {
            res = this.mercatorProjection.getTileXYForWGS84Point(x, y);
        }
        logger.log("getXYOfTileContainingPoint, res: ", res);
        return res;
    }

    getTileXYForWGS84Point(geoPoint) {
        logger.log("getTileXYForWGS84Point, geoPoint: ", geoPoint);
        if (geoPoint.lon < -179.999999 || geoPoint.lon > 179.999999 || geoPoint.lat < -85.0511 || geoPoint.lat > 85.0511) {
            throw "TILES_COORD_OUT_OF_RANGE";
        }
        let mercPoint = this.mercatorProjection.convertGeoToMerc(geoPoint);
        let res = this.getTileXYForMercatorPoint(mercPoint);
        logger.log("getTileXYForWGS84Point, res: ", res);
        return res;
    }

    getTileXYForMercatorPoint(mercPoint) {
        logger.log("getTileXYForMercatorPoint, mercPoint: ", mercPoint);
        let tileXY = {"x": 0, "y": 0};
        tileXY.x = Math.floor((mercPoint.east + (worldValues.EQUATOR / 2.0)) / this.horizontalMapTileSize);
        tileXY.y = Math.floor((worldValues.MERIDIAN - mercPoint.north) / this.verticalMapTileSize);
        logger.log("getTileXYForMercatorPoint, tileXY: ", tileXY);
        return tileXY;
    }


//Mercator coordinates stretch from -20037508.34 to 20037508.34 in each direction.
    getMercatorExtentForTile(tilex, tiley) {
        let x = Math.floor(tilex);
        let y = Math.floor(tiley);
        logger.log("getMercatorExtentForTile, zoom ", this.zoom, ": ", x, y);
        let minEast = (x * this.horizontalMapTileSize) - (worldValues.EQUATOR / 2.0);
        let maxEast = ((x + 1.0) * this.horizontalMapTileSize) - (worldValues.EQUATOR / 2.0);
        let maxNorth = worldValues.MERIDIAN - (y * this.verticalMapTileSize);
        let minNorth = worldValues.MERIDIAN - ((y + 1.0) * this.verticalMapTileSize);
        let res = {"minEast": minEast, "maxEast": maxEast, "minNorth": minNorth, "maxNorth": maxNorth};
        logger.log("getMercatorExtentForTile, res: ", res);
        return res;
    }

    getWGS84ExtentForTile(tilex, tiley) {
        let x = Math.floor(tilex);
        let y = Math.floor(tiley);
        logger.log("getWGS84EtentForTile, zoom ", this.zoom, ": ", x, y);
        let mercExtent = this.getMercatorExtentForTile(x, y);
        let maxMerc = {"north": mercExtent.maxNorth, "east": mercExtent.maxEast};
        let minMerc = {"north": mercExtent.minNorth, "east": mercExtent.minEast};
        let maxGeo = this.mercatorProjection.convertMercToGeo(maxMerc);
        let minGeo = this.mercatorProjection.convertMercToGeo(minMerc);
        let res = {"minLon": minGeo.lon, "minLat": minGeo.lat, "maxLon": maxGeo.lon, "maxLat": maxGeo.lat};
        logger.log("getWGS84EtentForTile, res: ", res);
        return res;
    }

    getZoomLevelCardinality() {
        return Math.pow(this.matrixSideSize, 2);
    }

}

export {ZoomLevel};

// let z = 19;
// let zoomLevel = new ZoomLevel(z);
// logger.log("Zoom level ", z, " cardinality ",  zoomLevel.getZoomLevelCardinality());
// let p = {"lon": 10, "lat": 46};
// logger.log("Geo point: ", p)
// let mp = zoomLevel.mercatorProjection.convertGeoToMerc(p);
// logger.log("Converted mercator point: ", mp);
// let gp = zoomLevel.mercatorProjection.convertMercToGeo(mp);
// logger.log("Re-converted geo point: ", gp);
// let xy = zoomLevel.getTileXYForWGS84Point(p);
// logger.log("Tiles coord: ", xy);
// let mercatorExtent = zoomLevel.getMercatorExtentForTile(xy.x, xy.y)
// logger.log("Mercator extent: ", mercatorExtent);
// let geoExtent = zoomLevel.getWGS84ExtentForTile(xy.x, xy.y)
// logger.log("WGS84 extent: ", geoExtent);