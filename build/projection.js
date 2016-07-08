"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 * Major Axis (the equator) = 6378.1370 km (FAI + 7 km)
 * Flattening at the minor axis (the Poles) = 1/298.257222101  6378.137 = 21.3847km
 * Polar radius = Major Axis radius minus flattening = 6356.7523 km (FAI - 14 km)
 */
var WGS84_SPHERICAL_AXIS = exports.WGS84_SPHERICAL_AXIS = 6378137.0;
var EQUATOR = exports.EQUATOR = WGS84_SPHERICAL_AXIS * Math.PI * 2;
var MERIDIAN = exports.MERIDIAN = WGS84_SPHERICAL_AXIS * Math.PI;
var PROJECTION_TYPE_WGS84 = exports.PROJECTION_TYPE_WGS84 = 11101;

//Mercator coordinates stretch from -20037508.34 to 20037508.34 in each direction.
var PROJECTION_TYPE_WEBMERCATOR = exports.PROJECTION_TYPE_WEBMERCATOR = 11102;
var TILE_SIZE = exports.TILE_SIZE = 256;

//# sourceMappingURL=projection.js.map