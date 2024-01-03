import Entity from "./Entity";


class Goal extends Entity {
    constructor(x, y, width, height, color) {
        super(x, y, width, height, color, Entity.Types.Goal, [
            { x: x, y: y },
            { x: x + width, y: y },
            { x: x + width, y: y + height },
            { x: x, y: y + height }
        ])
    }
}

export default Goal