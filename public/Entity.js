import Convex from './utils/Convex'

class Entity {
    // Entities are defined by their center (x, y) and boundary points
    constructor(x, y, color, type, points) {
        this.x = x
        this.y = y
        this.color = color
        this.type = type
        this.points = points
        this.collisions = []
        this.associatedEntities = [this]
    }

    static Types = {
        Player: "player",
        Weapon: "weapon",
        Border: "border"
    }

    getCenter() {
        return { x, y }
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
        const collision =  hitbox.isColliding(otherHitbox)
        return collision
    }

    handleCollision() {
        for (let i = 0; i < this.collisions.length; i++) {
            const collision = this.collisions[i]
            console.log(collision)
        }
    }

    update() {
        if (this.collisions.length > 0) {
            this.handleCollision()
        }
    }

}

export default Entity