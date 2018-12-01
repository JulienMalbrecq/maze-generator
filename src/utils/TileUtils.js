import config from '../config';

export function getTileOrigin (tile) {
    return [tile.position.x * config.tileSize, tile.position.y * config.tileSize];
}

export function getTileCorners (origin, tileSize) {
    return [
        [origin[0] + tileSize, origin[1]],
        [origin[0] + tileSize, origin[1] + tileSize],
        [origin[0], origin[1] + tileSize],
        origin
    ];
}