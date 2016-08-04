/**
 * Created by diego on 26/07/16.
 */
import {ZoomLevel} from './zoom_level';
import {logger} from './logger';

const OP_GET_TILE_XY = "GET_TILE_XY";
const OP_GET_TILE_EXT_GEO = "GET_TILE_EXT_GEO";
const OP_GET_TILE_EXT_MERC = "GET_TILE_EXT_MERC";

if (process.argv.length < 4 ) {
    console.log("Usage: " + __filename + " <OPERATION> <ZOOM> <X> <Y>");
    console.log("Operation: ");
    console.log("      ", OP_GET_TILE_XY);
    console.log("      ", OP_GET_TILE_EXT_GEO);
    console.log("      ", OP_GET_TILE_EXT_MERC);
    process.exit(-1);
}
let operation = process.argv[2];
logger.log('Operation: ', operation);
let zoom = Number(process.argv[3].trim());
logger.log('Zoom level: ', zoom);
let x = Number(process.argv[4].trim());
logger.log('X: ', x) ;
let y = Number(process.argv[5].trim());
logger.log('Y: ', y );

let result;


if (operation == OP_GET_TILE_XY) {
    let zl = new ZoomLevel(zoom);
    let p = {"lon": x, "lat": y};
    logger.log("Geo point: ", p);
    let xy = zl.getTileXYForWGS84Point(p);
    logger.log("Result: Tile coord: ", xy);
    result = xy;
} else if (operation == OP_GET_TILE_EXT_GEO) {
    let zl = new ZoomLevel(zoom);
    logger.log("Tile XY: ", x, y);
    let geoExtent = zl.getWGS84ExtentForTile(x, y);
    logger.log("Result: Tile WGS84 extent: ", geoExtent);
    result = geoExtent;
} else if (operation == OP_GET_TILE_EXT_MERC) {
    let zl = new ZoomLevel(zoom);
    let xy = {"x": x, "y": y};
    logger.log("Tile XY: ", xy);
    let mercatorExtent = zl.getMercatorExtentForTile(xy.x, xy.y);
    logger.log("Result: Tile Mercator extent: ", mercatorExtent);
    result = mercatorExtent;
} else {
    console.log("Operation not found: ", operation);
}

console.log(result);
