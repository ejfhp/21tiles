package com.treuropa.tremaps.loader.geo;

import com.vividsolutions.jts.geom.Coordinate;
import com.vividsolutions.jts.geom.Geometry;


/**
 * 
 * @author diego
 */
public class MercatorProjection {


	public static double convertLatToNorth(double lat) {
		double rad = Math.toRadians(lat);
		double y = 0.5 * Math.log((1 + Math.sin(rad)) / (1 - Math.sin(rad))) * Projection.WGS84_SPHERICAL_AXIS;
		return y;
	}

	public static double convertNorthToLat(double north) {
		double lat = 2 * Math.atan(Math.exp(north / Projection.WGS84_SPHERICAL_AXIS)) - 0.5 * Math.PI;
		return Math.toDegrees(lat);
	}

	public static double convertLonToEast(double lon) {
		double rad = Math.toRadians(lon);
		double x = rad * Projection.WGS84_SPHERICAL_AXIS;
		return x;
	}

	public static double convertEastToLon(double east) {
		 double lon = east / Projection.WGS84_SPHERICAL_AXIS;
		return Math.toDegrees(lon);
	}
	
	public static MercatorExtent getMercatorExtent(Geometry WGS84Polygon) {
	  Coordinate[] coords = WGS84Polygon.getCoordinates();
	  Coordinate[] mercatorCoords = new Coordinate[coords.length];
	  for (int i = 0; i < coords.length; i++) {
	    double lon = coords[i].x;
	    double lat = coords[i].y;
	    mercatorCoords[i] = new Coordinate(convertLonToEast(lon), convertLatToNorth(lat));
	  }
	  Coordinate UR = getUpperRightExtent(mercatorCoords);
	  Coordinate LL = getLowerLeftExtent(mercatorCoords);
	  MercatorExtent mercatorExtent = new MercatorExtent(LL.x, UR.x, LL.y, UR.y);
	  return mercatorExtent;
	}
	
	static Coordinate getUpperRightExtent(Coordinate[] coords) {
	  double[] xs = new double[coords.length];
	  double[] ys = new double[coords.length];
	  for (int i = 0; i < coords.length; i++) {
	    xs[i] = coords[i].x;
	    ys[i] = coords[i].y;
	  }
	  
	  double maxX = getMax(xs);
	  double maxY = getMax(ys);
	  return new Coordinate(maxX, maxY);
	}
	
	 static Coordinate getLowerLeftExtent(Coordinate[] coords) {
	    double[] xs = new double[coords.length];
	    double[] ys = new double[coords.length];
	    for (int i = 0; i < coords.length; i++) {
	      xs[i] = coords[i].x;
	      ys[i] = coords[i].y;
	    }
	    
	    double minX = getMin(xs);
	    double minY = getMin(ys);
	    return new Coordinate(minX, minY);
	  }
	
	static double getMin(double[] vals) {
	  double min = Double.POSITIVE_INFINITY;
	  for (double d: vals) {
	    min = (d < min ? d : min);
	  }
	  return min;
	}
	
	static double getMax(double[] vals) {
    double max = Double.NEGATIVE_INFINITY;
    for (double d: vals) {
      max = (d > max ? d : max);
    }
    return max;
  }

}
