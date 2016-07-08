/*
 * Major Axis (the equator) = 6378.1370 km (FAI + 7 km)
 * Flattening at the minor axis (the Poles) = 1/298.257222101  6378.137 = 21.3847km
 * Polar radius = Major Axis radius minus flattening = 6356.7523 km (FAI - 14 km)
 */
export const WGS84_SPHERICAL_AXIS = 6378137.0;
export const EQUATOR = WGS84_SPHERICAL_AXIS * Math.PI * 2;
export const MERIDIAN = WGS84_SPHERICAL_AXIS * Math.PI;
export const PROJECTION_TYPE_WGS84 = 11101;

//Mercator coordinates stretch from -20037508.34 to 20037508.34 in each direction.
export const PROJECTION_TYPE_WEBMERCATOR = 11102;
export const TILE_SIZE = 256;