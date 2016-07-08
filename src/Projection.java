package com.treuropa.tremaps.loader.geo;

public class Projection {
    /*
    * Major Axis (the equator) = 6378.1370 km (FAI + 7 km)
    * Flattening at the minor axis (the Poles) = 1/298.257222101  6378.137 = 21.3847km
    * Polar radius = Major Axis radius minus flattening = 6356.7523 km (FAI - 14 km)
    */
    public static final double WGS84_SPHERICAL_AXIS = 6378137.0D;

    public static final double EQUATOR = Projection.WGS84_SPHERICAL_AXIS * Math.PI * 2;
    public static final double MERIDIAN = Projection.WGS84_SPHERICAL_AXIS * Math.PI;

    public static final int PROJECTION_TYPE_WGS84 = 11101;
    //Mercator coordinates stretch from -20037508.34 to 20037508.34 in each direction.
    public static final int PROJECTION_TYPE_WEBMERCATOR = 11102;

    public static final int TILE_SIZE = 256;

}
