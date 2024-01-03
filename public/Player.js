import Entity from './Entity.js'
import Sword from './Sword.js'

const MOVE_SPEED = 5

class Player extends Entity {
    constructor(x, y, width, hp, color) {
        super(x, y, width, width, color, Entity.Types.Player, [], 4)
        this.hp = hp
        this.vel = {
            dxLeft: 0,
            dxRight: 0,
            dyUp: 0,
            dyDown: 0
        }
        this.sword = new Sword(x, y, 20, "white")

        // setup entity group while instantiating
        this.associatedEntities.push(this.sword)
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
        super.update()
    }

}

export default Player