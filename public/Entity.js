import Convex from './utils/Convex'

class Entity {
    constructor(x, y, color, type, points) {
        this.x = x
        this.y = y
        this.color = color
        this.type = type
        this.points = points
        this.collisions = []
        this.associatedEntities = []
    }

    static Types = {
        Player: "player",
        Weapon: "weapon",
        Border: "border"
    }

    getHitbox() {
        return new Convex(this.points)
    }

    getGroupedEntities() {
        return this.associatedEntities
    }

    isFriendly(otherEntity) {
        return this.associatedEntities.includes(otherEntity)
    }

    draw(context) {
        const hitbox = this.getHitbox()
        hitbox.draw(context, this.color)
    }

    checkCollision(otherEntity) {
        const hitbox = this.getHitbox()
        const otherHitbox = otherEntity.getHitbox()
        return hitbox.isColliding(otherHitbox)
    }
}

export default Entity