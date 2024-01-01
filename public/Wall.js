import Entity from "./Entity";

class Wall extends Entity {
    // (x,y) should refer to top left corner rather than center
    constructor(x, y, width, height) {
        super("blue", Entity.Types.Border, [
            { x: x, y: y },
            { x: x, y: y + height },
            { x: x + width, y: y + height },
            { x: x + width, y: y }
        ])
    }

    static createBorder(width, height) {
        const top = new Wall(-1, -1, width + 1, 1)
        const left = new Wall(-1, -1, 1, height + 1)
        const bottom = new Wall(-1, height, width + 1, 1)
        const right = new Wall(width, 0, 1, height)

        return [top, left, bottom, right]
    }
}

export default Wall