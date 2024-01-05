

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

    update(context, gameDimensions) {
        // handle collisions
        for (let i = 0; i < this.entities.length; i++) {
            const entity1 = this.entities[i]
            entity1.collisions = [] // reset collisions every frame
            for (let j = 0; j < this.entities.length; j++) {
                if (j === i) continue;

                const entity2 = this.entities[j]
                const collision = entity1.checkCollision(entity2)
                if (collision.isColliding && !entity1.isFriendly(entity2)) {
                    entity1.collisions.push({ entity: entity2, ...collision })
                }
            }
        }

        // update entities
        this.entities.forEach(entity => {
            entity.update(gameDimensions)
            entity.draw(context)
        })
    }
}

export default GameManager