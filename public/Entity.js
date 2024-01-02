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
        const collision =  hitbox.getCollision(otherHitbox)
        return collision
    }

    resolveCollision(collision) {
        // moves the entity away from the center of the colliding entity
        const otherEntity = collision.entity
        const dx = this.x - otherEntity.x
        const dy = this.y - otherEntity.y
        const dist = Math.sqrt(dx**2 + dy**2)

        const mvtX = dx * collision.mvtMagnitude / dist
        const mvtY = dy * collision.mvtMagnitude / dist

        this.x += mvtX
        this.y += mvtY
    }

    resolveCollision2(collision) {
        // ------------> SAT static resolution <------------
        // collisions are checked preferentially on left/bottom face first
        // this is just an easy fix for when edge normal is inverted
        const otherEntity = collision.entity
        if (this.x > otherEntity.x) {
            collision.mvtVector.i *= -1
        }
        if (this.y < otherEntity.y) {
            collision.mvtVector.j *= -1
        }

        this.x += collision.mvtVector.i * collision.mvtMagnitude
        this.y += collision.mvtVector.j * collision.mvtMagnitude
    }

    update() {

    }

}

export default Entity