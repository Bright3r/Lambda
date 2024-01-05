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
        for (let i = 0; i < this.collisions.length; i++) {
            const collision = this.collisions[i]
            if (collision.entity.type === Entity.Types.Ball) {
                this.enemyTeam.goal()
            }
        }
        // super.update(this.vertices)
    }
}

export default Goal