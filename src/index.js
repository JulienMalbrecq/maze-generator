import config from './config';
import { indexFromPosition } from "./utils/PositionUtils";
import MazeGenerator from './maze/MazeGenerator';
import drawMaze from "./maze/MazeDraw";
import drawPlayer from "./player/PlayerDraw";

let playground = document.createElement('div'),
    mazeCanvas = document.createElement('canvas'),
    playerMap = document.createElement('canvas'),
    mazeContext = mazeCanvas.getContext('2d'),
    playerContext = playerMap.getContext('2d'),
    maze = [],
    playerPosition = 0,
    moves = 0;

function init() {
    [mazeCanvas, playerMap].forEach(canvas => {
        canvas.width = config.columns * config.tileSize;
        canvas.height = config.lines * config.tileSize;
    });

    playground.id = 'playground';
    playground.style.width = (config.columns * config.tileSize) + 'px';
    playground.style.height = (config.lines * config.tileSize) + 'px';

    playground.appendChild(playerMap);
    playground.appendChild(mazeCanvas);
    document.body.appendChild(playground);

    document.addEventListener('keydown', (ev) => {
        let key = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'].indexOf(ev.code);
        if (key !== -1) {
            updatePlayerPos(key);
        }
    });

    maze = new MazeGenerator(config.totalTiles).generate();
    playerPosition = indexFromPosition({x: (config.columns / 4) <<0, y: (config.lines/4)<<0});

    drawMaze(maze, mazeContext);
    drawPlayer(playerPosition, maze, playerContext);
}

function updatePlayerPos(direction) {
    let tile = maze[playerPosition],
        newPos = maze[playerPosition].neighbours[direction];

    if (newPos !== -1 && [tile.from, ...tile.to].indexOf(newPos) !== -1) {
        playerPosition = newPos;
        tile.playerVisit += 1;
        drawPlayer(playerPosition, maze, playerContext);
        moves++;

        if (newPos === config.totalTiles - 1) {
            setTimeout(() => alert('Finis en ' + moves + ' mouvements'));
        }
    }

}

init();
