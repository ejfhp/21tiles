"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by diego on 17/06/16.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _world_values = require("./world_values");

var projection = _interopRequireWildcard(_world_values);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TileExtent = function () {

    //Mercator coordinates stretch from -20037508.34 to 20037508.34 in each direction.

    function TileExtent(zoomLevel) {
        _classCallCheck(this, TileExtent);

        this.zoom = zoomLevel;
        this.matrixSideSize = Math.pow(2, this.zoom);
        this.horizontalMapTileSize = projection.EQUATOR / this.matrixSideSize;
        this.verticalMapTileSize = 2 * Projection.MERIDIAN / this.matrixSideSize;
    }

    _createClass(TileExtent, [{
        key: "getMercatorExtentForTile",
        value: function getMercatorExtentForTile(x, y) {
            var xMin = x * this.horizontalMapTileSize - projection.EQUATOR / 2.0;
            var xMax = (x + 1.0) * this.horizontalMapTileSize - projection.EQUATOR / 2.0;
            var yMax = p.MERIDIAN - y * this.verticalMapTileSize;
            var yMin = projection.MERIDIAN - (y + 1.0) * this.verticalMapTileSize;
            return { "xMin": xMin, "xMax": xMax, "yMin": yMin, "yMax": yMax };
        }
    }]);

    return TileExtent;
}();

//# sourceMappingURL=tileextent.js.map