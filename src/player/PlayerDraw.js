import config from "../config";
import {getTileOrigin} from "../utils/TileUtils";

export default function drawPlayer(playerIndex, maze, context) {
    context.clearRect(0, 0, config.columns * config.tileSize, config.lines * config.tileSize);

    let player = maze[playerIndex],
        origin = getTileOrigin(player).map(v => v + config.tileSize / 2);
        // tileSize = config.tileSize - (2 * config.tilePadding);

    //context.fillRect(...origin, tileSize, tileSize);
    context.fillStyle = 'red';

    context.beginPath();
    context.arc(...origin, (config.tileSize - (config.tilePadding*4)) / 2, 0, Math.PI * 2);
    context.fill();
    context.closePath();
}