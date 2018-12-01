let playWidth = 800,
    maxDifficulty = 4,
    difficulty = 3,
    columns = playWidth / ((maxDifficulty-difficulty + 1) * 10) << 0,
    lines = (columns * (9/16) ) << 0,
    totalTiles = columns * lines,
    tileSize = (playWidth / columns) << 0,
    tilePadding = 2.5;

export default {
    difficulty,
    columns,
    lines,
    totalTiles,
    tileSize,
    playWidth,
    tilePadding
};