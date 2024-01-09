import Entity from "./Entity.js"

class GameManager {
    constructor(team1, team2) {
        this.team1 = team1
        this.team2 = team2
        this.entities = []
    }

    addEntity(entity) {
        const entityGroup = entity.getGroupedEntities()
        entityGroup.forEach(ent => this.entities.push(ent))
    }

    removeEntity(entity) {
        const idx = this.entities.indexOf(entity)
        this.entities.splice(idx)
    }

    resetEntities() {
        this.entities.forEach(entity => {
            entity.reset()
        })
    }

    drawScore(context, gameDimensions) {
        context.fillStyle = "white"
        context.font = "50px serif"
        context.fillText(this.team1.score.toString(), gameDimensions.width / 4, 50)
        context.fillText(this.team2.score.toString(), gameDimensions.width * 3 / 4, 50)
    }

    update(context, gameDimensions) {
        // update entities
        this.entities.forEach(entity => {
            entity.update(gameDimensions)
            entity.draw(context)
        })

        // handle collisions
        let isGoalScored = false
        for (let i = 0; i < this.entities.length; i++) {
            const entity1 = this.entities[i]
            entity1.collisions = [] // reset collisions every frame
            for (let j = 0; j < this.entities.length; j++) {
                if (j === i) continue;

                const entity2 = this.entities[j]
                const collision = entity1.checkCollision(entity2)
                if (collision.isColliding && !entity1.isFriendly(entity2)) {
                    if (entity1.type === Entity.Types.Goal && entity2.type === Entity.Types.Ball) {
                        isGoalScored = true
                        entity1.enemyTeam.score++
                    }

                    entity1.collisions.push({ entity: entity2, ...collision })
                }
            }
        }

        this.drawScore(context, gameDimensions)

        return isGoalScored
    }
}

export default GameManager