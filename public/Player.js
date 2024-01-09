import Entity from './Entity.js'
import Sword from './Sword.js'
import Vector2d from './utils/Vector2d.js'

const MOVE_SPEED = 10    // make same as ball speed to stop ball clipping
// going to keep it higher for now b/c ball clipping might be a fun mechanic
// NOTE: if move speed double the ball move speed, ball clipping is very consistent

class Player extends Entity {
    constructor(x, y, width, color) {
        super(x, y, width, width, color, Entity.Types.Player, [], 4)
        this.vel = {
            dxLeft: 0,
            dxRight: 0,
            dyUp: 0,
            dyDown: 0
        }
        this.sword = new Sword(x, y, "#353535")

        // setup entity group while instantiating
        this.associatedEntities.push(this.sword)
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

        const playerDirectionVec = new Vector2d(this.vel.dxLeft + this.vel.dxRight, this.vel.dyUp + this.vel.dyDown)
        const movementVec = playerDirectionVec.getNormalizedVector().getScaledVector(MOVE_SPEED)
        
        this.x += movementVec.i
        this.y += movementVec.j

        this.sword.update(this.x, this.y)
        super.update()
    }

}

export default Player