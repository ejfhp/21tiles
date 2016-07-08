/**
 * Created by diego on 17/06/16.
 */
import * as projection from './world_values';

class TileExtent {

    //Mercator coordinates stretch from -20037508.34 to 20037508.34 in each direction.
    constructor(zoomLevel) {
        this.zoom = zoomLevel;
        this.matrixSideSize = Math.pow(2, this.zoom);
        this.horizontalMapTileSize = projection.EQUATOR / this.matrixSideSize;
        this.verticalMapTileSize = (2 * Projection.MERIDIAN) / this.matrixSideSize;
    }

    getMercatorExtentForTile(x, y) {
        let xMin = (x * this.horizontalMapTileSize) - (projection.EQUATOR / 2.0);
        let xMax = ((x + 1.0) * this.horizontalMapTileSize) - (projection.EQUATOR / 2.0);
        let yMax = p.MERIDIAN - (y * this.verticalMapTileSize);
        let yMin = projection.MERIDIAN - ((y + 1.0) * this.verticalMapTileSize);
        return {"xMin": xMin, "xMax": xMax, "yMin": yMin, "yMax": yMax};
    }
}