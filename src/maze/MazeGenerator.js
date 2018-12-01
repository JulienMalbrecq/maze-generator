import {neighboursFromPosition, positionFromIndex, randomPosition} from "../utils/PositionUtils";

export default class MazeGenerator {
    constructor (totalTiles) {
        this.tiles = [];
        this.totalTiles = totalTiles;
    }

    chooseNextTileIndex(tile) {
        let candidates = tile.neighbours.filter(index => index >= 0 && !this.tiles[index].visited);
        return candidates.length > 0
            ? candidates[Math.random() * candidates.length << 0]
            : false;
    }

    chooseNextTile(current) {
        this.tiles[current].visited = true;
        let nextIndex = this.chooseNextTileIndex(this.tiles[current]);

        if (nextIndex !== false) {
            this.tiles[current].to.push(nextIndex);
            this.tiles[nextIndex].from = current;
            current = nextIndex;
        } else {
            current = this.tiles[current].from;
        }

        return current;
    }

    generate() {
        let i,
            current = randomPosition(),
            position;

        for (i = 0; i < this.totalTiles; i += 1) {
            position = positionFromIndex(i);
            this.tiles.push({
                index: i,
                position: position,
                neighbours : neighboursFromPosition(position),
                visited : false,
                from : null,
                to : [],
                playerVisit: 0
            });
        }

        do {
            current = this.chooseNextTile(current);
        } while(current !== null);

        return this.tiles;
    }
}