import Entity from './Entity.js'
import Sword from './Sword.js'

const MOVE_SPEED = 2

class Player extends Entity {
    constructor(x, y, radius, hp, color) {
        super(color, Entity.Types.Player,
            [{ x: x + radius, y: y + radius },
            { x: x + radius, y: y - radius },
            { x: x - radius, y: y - radius },
            { x: x - radius, y: y + radius }])
        this.x = x
        this.y = y
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

    draw(context) {
        super.draw(context)
        this.sword.draw(context)
    }

    update() {
        const dx = MOVE_SPEED * (this.vel.dxLeft + this.vel.dxRight)
        const dy = MOVE_SPEED * (this.vel.dyUp + this.vel.dyDown)

        this.x += dx
        this.y += dy

        let isInvalidPlayerPosition = false
        for (let i = 0; i < this.collisions.length; i++) {
            const collision = this.collisions[i]
            if (collision.type === Entity.Types.Border) {
                isInvalidPlayerPosition = true
            }
        }

        if (isInvalidPlayerPosition) {
            this.x -= dx
            this.y -= dy
        }

        this.sword.update(this.x, this.y)
        super.points = this.positionToHitbox()    // update hitbox
        super.update()
    }

}

export default Player