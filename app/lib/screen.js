
export function getBoundingBox(screenCoords) {
    const maxX = Math.max(screenCoords[0][0], screenCoords[1][0]);
    const minX = Math.min(screenCoords[0][0], screenCoords[1][0]);
    const maxY = Math.max(screenCoords[0][1], screenCoords[1][1]);
    const minY = Math.min(screenCoords[0][1], screenCoords[1][1]);
    return [maxY, maxX, minY, minX];
}

export function getScreenBoundingBox(screenPointX, screenPointY) {
    const screenCoords = [];

    const offset = 44;

    screenCoords.push([screenPointX+offset, screenPointY+offset]);
    screenCoords.push([screenPointX-offset, screenPointY-offset]);

    return getBoundingBox(screenCoords);
}