import Entity from './Entity.js'
import Sword from './Sword.js'

const MOVE_SPEED = 2

class Player extends Entity {
    constructor(x, y, radius, hp, color) {
        super(x, y, color, Entity.Types.Player,
            [{ x: x + radius, y: y + radius },
            { x: x + radius, y: y - radius },
            { x: x - radius, y: y - radius },
            { x: x - radius, y: y + radius }])
        this.radius = radius
        this.hp = hp
        this.vel = {
            dxLeft: 0,
            dxRight: 0,
            dyUp: 0,
            dyDown: 0
        }
        this.sword = new Sword(x, y, 5, "white")

        // setup entity group while instantiating
        this.associatedEntities.push(this.sword)
    }

    positionToHitbox() {
        return [
            { x: this.x + this.radius, y: this.y + this.radius },
            { x: this.x + this.radius, y: this.y - this.radius },
            { x: this.x - this.radius, y: this.y - this.radius },
            { x: this.x - this.radius, y: this.y + this.radius }
        ]
    }

    resolveCollision(collision) {
        const otherEntity = collision.entity
        const dx = this.x - otherEntity.x
        const dy = this.y - otherEntity.y
        const dist = Math.sqrt(dx**2 + dy**2)

        const mvtX = dx * collision.mvtMagnitude / dist
        const mvtY = dy * collision.mvtMagnitude / dist

        this.x += mvtX
        this.y += mvtY
    }

    draw(context) {
        super.draw(context)
        this.sword.draw(context)
    }

    handleBorder(GAME_DIMENSIONS) {
        if (this.x - this.radius < 1) {
            this.x = 1 + this.radius
        }
        else if (this.x + this.radius > GAME_DIMENSIONS.width) {
            this.x = GAME_DIMENSIONS.width - this.radius - 1
        }

        if (this.y - this.radius < 1) {
            this.y = 1 + this.radius
        }
        else if (this.y + this.radius > GAME_DIMENSIONS.height) {
            this.y = GAME_DIMENSIONS.height - this.radius - 1
        }
    }

    update(GAME_DIMENSIONS) {
        this.handleBorder(GAME_DIMENSIONS)

        for (let i = 0; i < this.collisions.length; i++) {
            const collision = this.collisions[i]
            if (collision.entity.type === Entity.Types.Border) {
                this.resolveCollision(collision)
            }
        }

        const dx = MOVE_SPEED * (this.vel.dxLeft + this.vel.dxRight)
        const dy = MOVE_SPEED * (this.vel.dyUp + this.vel.dyDown)

        this.x += dx
        this.y += dy

        this.sword.update(this.x, this.y)
        super.points = this.positionToHitbox()    // update hitbox
        super.update()
    }

}

export default Player