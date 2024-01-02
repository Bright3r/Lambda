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
        this.sword = new Sword(x, y, 10, "white")

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

    resolveGameBorderCollision(gameDimensions) {
        if (this.x - this.radius < 1) {
            this.x = 1 + this.radius
        }
        else if (this.x + this.radius > gameDimensions.width) {
            this.x = gameDimensions.width - this.radius - 1
        }

        if (this.y - this.radius < 1) {
            this.y = 1 + this.radius
        }
        else if (this.y + this.radius > gameDimensions.height) {
            this.y = gameDimensions.height - this.radius - 1
        }
    }

    printCollisions() {
        console.log(this.collisions)
    }

    draw(context) {
        super.draw(context)
        this.sword.draw(context)
    }

    update(gameDimensions) {
        this.resolveGameBorderCollision(gameDimensions)

        for (let i = 0; i < this.collisions.length; i++) {
            const collision = this.collisions[i]
            if (collision.entity.type === Entity.Types.Border) {
                this.resolveCollision2(collision)
            }
            else if (collision.entity.type === Entity.Types.Weapon) {
                this.resolveCollision(collision)    // less prone to clipping
            }
            else if (collision.entity.type === Entity.Types.Player) {
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