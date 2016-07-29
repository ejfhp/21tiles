/**
 * Created by diego on 26/07/16.
 */
import * as zoomLevel from './zoom_level';
import {logger} from './logger';


    const OP_GET_TILE_XY = "GET_TILE_XY";
    const OP_GET_TILE_EXT_GEO = "GET_TILE_EXT_GEO";
    const OP_GET_TILE_EXT_MERC = "GET_TILE_EXT_MERC";

if (process.argv.length < 4 ) {
    console.log("Usage: " + __filename + " <OPERATION> <ZOOM> <X> <Y>");
    process.exit(-1);
}
let operation = process.argv[2];
logger.log('Operation: ', operation);
let zoom = process.argv[3];
logger.log('Zoom level: ', zoom);
let x = process.argv[4];
logger.log('X: ', x);
let y = process.argv[5];
logger.log('Y: ', y);

let result;

if (operation == OP_GET_TILE_XY) {
    let zl = new zoomLevel.ZoomLevel(zoom);
    let p = {"lon": x, "lat": y};
    logger.log("Geo point: ", p);
    let xy = zl.getTileXYForWGS84Point(p);
    logger.log("Tile coord: ", xy);
    result = xy;
} else if (operation == OP_GET_TILE_EXT_GEO) {
    let zl = new zoomLevel.ZoomLevel(zoom);
    let xy = {"x": x, "y": y};
    logger.log("Tile XY: ", xy);
    let mercatorExtent = zl.getWGS84ExtentForTile(xy.x, xy.y);
    logger.log("Tile WGS84 extent: ", mercatorExtent);
    result = mercatorExtent;
} else if (operation == OP_GET_TILE_EXT_MERC) {
    let zl = new zoomLevel.ZoomLevel(zoom);
    let xy = {"x": x, "y": y};
    logger.log("Tile XY: ", xy);
    let mercatorExtent = zl.getMercatorExtentForTile(xy.x, xy.y);
    logger.log("Tile Mercator extent: ", mercatorExtent);
    result = mercatorExtent;
} else {
    console.log("Operation not found: ", operation);
}

console.log(result);
