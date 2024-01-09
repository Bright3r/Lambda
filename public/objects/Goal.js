import Entity from "./Entity";


class Goal extends Entity {
    constructor(x, y, width, height, color, enemyTeam) {
        const topLeft = { x: x - (width / 2), y: y - (height / 2)}
        super(x, y, width, height, color, Entity.Types.Goal, [
            { x: topLeft.x, y: topLeft.y },
            { x: topLeft.x + width, y: topLeft.y },
            { x: topLeft.x + width, y: topLeft.y + height },
            { x: topLeft.x, y: topLeft.y + height }
        ])
        this.enemyTeam = enemyTeam
    }

    update() {

    }
}

export default Goal