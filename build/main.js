'use strict';

var _zoom_level = require('./zoom_level');

var _logger = require('./logger');

/**
 * Created by diego on 26/07/16.
 */


var OP_GET_TILE_XY = "GET_TILE_XY";
var OP_GET_TILE_EXT_GEO = "GET_TILE_EXT_GEO";
var OP_GET_TILE_EXT_MERC = "GET_TILE_EXT_MERC";

if (process.argv.length < 4) {
    console.log("Usage: " + __filename + " <OPERATION> <ZOOM> <X> <Y>");
    console.log("Operation: ");
    console.log("      ", OP_GET_TILE_XY);
    console.log("      ", OP_GET_TILE_EXT_GEO);
    console.log("      ", OP_GET_TILE_EXT_MERC);
    process.exit(-1);
}
var operation = process.argv[2];
_logger.logger.log('Operation: ', operation);
var zoom = Number(process.argv[3].trim());
_logger.logger.log('Zoom level: ', zoom);
var x = Number(process.argv[4].trim());
_logger.logger.log('X: ', x);
var y = Number(process.argv[5].trim());
_logger.logger.log('Y: ', y);

var result = void 0;

if (operation == OP_GET_TILE_XY) {
    var zl = new _zoom_level.ZoomLevel(zoom);
    var p = { "lon": x, "lat": y };
    _logger.logger.log("Geo point: ", p);
    var xy = zl.getTileXYForWGS84Point(p);
    _logger.logger.log("Result: Tile coord: ", xy);
    result = xy;
} else if (operation == OP_GET_TILE_EXT_GEO) {
    var _zl = new _zoom_level.ZoomLevel(zoom);
    _logger.logger.log("Tile XY: ", x, y);
    var geoExtent = _zl.getWGS84ExtentForTile(x, y);
    _logger.logger.log("Result: Tile WGS84 extent: ", geoExtent);
    result = geoExtent;
} else if (operation == OP_GET_TILE_EXT_MERC) {
    var _zl2 = new _zoom_level.ZoomLevel(zoom);
    var _xy = { "x": x, "y": y };
    _logger.logger.log("Tile XY: ", _xy);
    var mercatorExtent = _zl2.getMercatorExtentForTile(_xy.x, _xy.y);
    _logger.logger.log("Result: Tile Mercator extent: ", mercatorExtent);
    result = mercatorExtent;
} else {
    console.log("Operation not found: ", operation);
}

console.log(result);

//# sourceMappingURL=main.js.map