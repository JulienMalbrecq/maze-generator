import config from '../config';
import {getTileCorners, getTileOrigin} from "../utils/TileUtils";

export function draw(tile, context) {
    let padding = 1.5,
        openNeighbours = tile.neighbours
            .filter(index => [tile.from, ...tile.to].indexOf(index) !== -1)
            .map(open => tile.neighbours.indexOf(open)),
        origin = getTileOrigin(tile),
        strokes = [
            [origin[0] + config.tileSize - padding, origin[1] + padding],
            [origin[0] + config.tileSize - padding, origin[1] + config.tileSize - padding],
            [origin[0] + padding, origin[1] + config.tileSize - padding],
            [origin[0] + padding, origin[1] +padding]
        ];

    strokes.filter((stroke, index) => openNeighbours.indexOf(index) === -1)
        .forEach(stroke => {
            context.moveTo(...strokes[(4+(strokes.indexOf(stroke)-1))%4]);
            context.lineTo(...stroke);
        });
}

export function newDraw(tile, context) {
    let origin = getTileOrigin(tile),
        // outsideCorners = getTileCorners(origin, config.tileSize),
        insideCorners = getTileCorners(origin.map(v => v + config.tilePadding), config.tileSize - ( 2 * config.tilePadding)),
        neighboursOpenState = tile.neighbours.map(neighbour => [tile.from, ...tile.to].indexOf(neighbour) !== -1);

    insideCorners.forEach((corner, index)=> {
        let previousCorner = insideCorners[(4+(insideCorners.indexOf(corner)-1))%4];

        context.moveTo(...previousCorner);
        if (false === neighboursOpenState[index]) { // for all closed path
            context.lineTo(...corner);
        } else {
            // index % 2 === 0 -> vertical
            if (index % 2 === 0) {
                context.lineTo(previousCorner[0], previousCorner[1] + (config.tilePadding * (index - 1)));
                context.moveTo(...corner);
                context.lineTo(corner[0], corner[1] + (config.tilePadding * (index - 1)));
            } else {
                context.lineTo(previousCorner[0] - (config.tilePadding * (index - 2)), previousCorner[1]);
                context.moveTo(...corner);
                context.lineTo(corner[0] - (config.tilePadding * (index - 2)), corner[1]);
            }
        }
    });
}

export default function drawMaze(tiles, context) {
    tiles.forEach(tile => newDraw(tile, context));
    context.stroke();
}
