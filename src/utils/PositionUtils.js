import config from '../config';

export function randomPosition() {
    return Math.random() * config.totalTiles << 0;
}

export function indexFromPosition(position) {
    return position ? position.y * config.columns + position.x : -1;
}

export function positionFromIndex(index) {
    return {
        x: index % config.columns,
        y: ((index / config.columns) << 0)
    };
}

export function neighboursFromPosition(position) {
    /*
        | y-1|
    ____|____|____
     x-1|  x |x+1
    ____|____|____
        | y+1|
        |	 |
    */

    return [
        {x: position.x, y: position.y - 1},
        {x: position.x + 1, y: position.y},
        {x: position.x, y: position.y + 1},
        {x: position.x - 1, y: position.y}
    ].map(p => p.x >=0 && p.y >=0 && p.x < config.columns && p.y < config.lines ? p : null)
        .map(indexFromPosition);
}