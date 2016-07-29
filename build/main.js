'use strict';

var _zoom_level = require('./zoom_level');

var zoomLevel = _interopRequireWildcard(_zoom_level);

var _logger = require('./logger');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Created by diego on 26/07/16.
 */


var OP_GET_TILE_XY = "GET_TILE_XY";
var OP_GET_TILE_EXT_GEO = "GET_TILE_EXT_GEO";
var OP_GET_TILE_EXT_MERC = "GET_TILE_EXT_MERC";

if (process.argv.length < 4) {
    console.log("Usage: " + __filename + " <OPERATION> <ZOOM> <X> <Y>");
    process.exit(-1);
}
var operation = process.argv[2];
_logger.logger.log('Operation: ', operation);
var zoom = process.argv[3];
_logger.logger.log('Zoom level: ', zoom);
var x = process.argv[4];
_logger.logger.log('X: ', x);
var y = process.argv[5];
_logger.logger.log('Y: ', y);

var result = void 0;

if (operation == OP_GET_TILE_XY) {
    var zl = new zoomLevel.ZoomLevel(zoom);
    var p = { "lon": x, "lat": y };
    _logger.logger.log("Geo point: ", p);
    var xy = zl.getTileXYForWGS84Point(p);
    _logger.logger.log("Tile coord: ", xy);
    result = xy;
} else if (operation == OP_GET_TILE_EXT_GEO) {
    var _zl = new zoomLevel.ZoomLevel(zoom);
    var _xy = { "x": x, "y": y };
    _logger.logger.log("Tile XY: ", _xy);
    var mercatorExtent = _zl.getWGS84ExtentForTile(_xy.x, _xy.y);
    _logger.logger.log("Tile WGS84 extent: ", mercatorExtent);
    result = mercatorExtent;
} else if (operation == OP_GET_TILE_EXT_MERC) {
    var _zl2 = new zoomLevel.ZoomLevel(zoom);
    var _xy2 = { "x": x, "y": y };
    _logger.logger.log("Tile XY: ", _xy2);
    var _mercatorExtent = _zl2.getMercatorExtentForTile(_xy2.x, _xy2.y);
    _logger.logger.log("Tile Mercator extent: ", _mercatorExtent);
    result = _mercatorExtent;
} else {
    console.log("Operation not found: ", operation);
}

console.log(result);

//# sourceMappingURL=main.js.map