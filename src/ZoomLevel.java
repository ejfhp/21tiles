package com.treuropa.tremaps.loader.geo;

import com.treuropa.tremaps.loader.Errors;

public class ZoomLevel {

    private int zoom;
    private double horizontalMapTileSize;
    private double verticalMapTileSize;
    private int matrixSideSize;

    protected ZoomLevel(int zoomLevel) {
        this.initializeMatrix(zoomLevel);
    }

    public int[] getXYOfTileContainingPoint(double x, double y, int projectionType) throws Exception {
        int[] res = null;
        if (projectionType == Projection.PROJECTION_TYPE_WEBMERCATOR) {
            res = this.getTileXYForMercatorPoint(x, y);
        } else if (projectionType == Projection.PROJECTION_TYPE_WGS84) {
            res = this.getTileXYForWGS84Point(x, y);
        }
        return res;
    }

    public int[] getTileXYForWGS84Point(double lon, double lat) throws Exception {
        if (lon < -179.999999 || lon > 179.999999 || lat < -85.0511 || lat > 85.0511) {
            throw new Exception(Errors.TILES_COORD_OUT_OF_RANGE.toString());
        }
        double north = MercatorProjection.convertLatToNorth(lat);
        double east = MercatorProjection.convertLonToEast(lon);
        int tileX = (int) Math.floor((east + (Projection.EQUATOR / 2.0)) / this.horizontalMapTileSize);
        int tileY = (int) Math.floor((Projection.MERIDIAN - north) / this.verticalMapTileSize);
        return new int[] { tileX, tileY };
    }


    public int[] getTileXYForMercatorPoint(double east, double north) throws Exception {
        int tileX = (int) Math.floor((east + (Projection.EQUATOR / 2.0)) / this.horizontalMapTileSize);
        int tileY = (int) Math.floor((Projection.MERIDIAN - north) / this.verticalMapTileSize);
        return new int[] { tileX, tileY };
    }


    //Mercator coordinates stretch from -20037508.34 to 20037508.34 in each direction.
    public MercatorExtent getMercatorExtentForTile(int x, int y) {
        double xMin = (x * this.horizontalMapTileSize) - (Projection.EQUATOR / 2.0);
        double xMax = ((x + 1.0) * this.horizontalMapTileSize) - (Projection.EQUATOR / 2.0);
        double yMax = Projection.MERIDIAN - (y * this.verticalMapTileSize);
        double yMin = Projection.MERIDIAN - ((y + 1.0) * this.verticalMapTileSize);
        MercatorExtent me = new MercatorExtent(xMin, xMax, yMin, yMax);
        return me;
    }

    public WGS84Extent getWGS84ExtentForTile(int x, int y) {
        return ExtentUtils.convertMercatorToWGS84(getMercatorExtentForTile(x, y));
    }

    public long getZoomLevelCardinality() {
        return (long) Math.pow(this.matrixSideSize, 2);
    }

    private void initializeMatrix(int zoomLevel) {
        this.zoom = zoomLevel;
        this.matrixSideSize = (int) Math.pow(2, this.zoom);
        this.horizontalMapTileSize = Projection.EQUATOR / this.matrixSideSize;
        this.verticalMapTileSize = (2 * Projection.MERIDIAN) / this.matrixSideSize;
    }

}
