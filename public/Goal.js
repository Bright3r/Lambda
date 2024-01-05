import Entity from "./Entity";


class Goal extends Entity {
    constructor(x, y, width, height, color, enemyTeam) {
        super(x, y, width, height, color, Entity.Types.Goal, [
            { x: x, y: y },
            { x: x + width, y: y },
            { x: x + width, y: y + height },
            { x: x, y: y + height }
        ])
        this.enemyTeam = enemyTeam
    }

    update() {
        for (let i = 0; i < this.collisions.length; i++) {
            const collision = this.collisions[i]
            if (collision.entity.type === Entity.Types.Ball) {
                console.log(this.enemyTeam)
                this.enemyTeam.goal()
            }
        }
        // super.update(this.vertices)
    }
}

export default Goal