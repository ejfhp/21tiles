"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MercatorProjection = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _world_values = require("./world_values");

var projection = _interopRequireWildcard(_world_values);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MercatorProjection = function () {
    function MercatorProjection() {
        _classCallCheck(this, MercatorProjection);

        this.pi = Math.acos(-1);
    }

    _createClass(MercatorProjection, [{
        key: "convertGeoToMerc",
        value: function convertGeoToMerc(geoP) {
            var mercP = { "north": 0, "east": 0 };
            var radLat = this.toRadians(geoP.lat);
            var radLon = this.toRadians(geoP.lon);
            mercP.north = 0.5 * Math.log((1 + Math.sin(radLat)) / (1 - Math.sin(radLat))) * projection.WGS84_SPHERICAL_AXIS;
            mercP.east = radLon * projection.WGS84_SPHERICAL_AXIS;
            return mercP;
        }
    }, {
        key: "convertMercToGeo",
        value: function convertMercToGeo(mercP) {
            var mercG = { "lat": 0, "lon": 0 };
            mercG.lon = this.toDegree(mercP.east / projection.WGS84_SPHERICAL_AXIS);
            mercG.lat = this.toDegree(2 * Math.atan(Math.exp(mercP.north / projection.WGS84_SPHERICAL_AXIS)) - 0.5 * Math.PI);
            return mercG;
        }
    }, {
        key: "getUpperRightExtent",
        value: function getUpperRightExtent(coordinates) {
            var xs = void 0;
            var ys = void 0;
            for (var i = 0; i < coordinates.length; i++) {
                xs[i] = coords[i].x;
                ys[i] = coords[i].y;
            }

            var maxX = getMax(xs);
            var maxY = getMax(ys);
            return [{ "x": maxX, "y": maxY }];
        }
    }, {
        key: "getLowerLeftExtent",
        value: function getLowerLeftExtent(coords) {
            var xs = new double[coords.length]();
            var ys = new double[coords.length]();
            for (var i = 0; i < coords.length; i++) {
                xs[i] = coords[i].x;
                ys[i] = coords[i].y;
            }

            var minX = getMin(xs);
            var minY = getMin(ys);
            return [{ "x": minX, "y": minY }];
        }
    }, {
        key: "getMin",
        value: function getMin(vals) {
            var min = 999999;
            for (var d in vals) {
                min = d < min ? d : min;
            }
            return min;
        }
    }, {
        key: "getMax",
        value: function getMax(vals) {
            var max = -999999;
            for (var d in vals) {
                max = d > max ? d : max;
            }
            return max;
        }
    }, {
        key: "toRadians",
        value: function toRadians(degree) {
            return degree * (this.pi / 180);
        }
    }, {
        key: "toDegree",
        value: function toDegree(radians) {
            return radians * (180 / this.pi);
        }
    }]);

    return MercatorProjection;
}();

exports.MercatorProjection = MercatorProjection;

//# sourceMappingURL=mercator_projection.js.map