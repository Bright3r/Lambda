import Entity from "./Entity";

const BALL_MOVE_SPEED = 5

class Ball extends Entity {
    constructor(x, y, radius, color) {
        super(x, y, radius, radius, color, Entity.Types.Ball, [], 12)
        this.radius = radius
        this.vel = {
            dx: BALL_MOVE_SPEED,
            dy: BALL_MOVE_SPEED
        }
    }

    draw(context) {
        context.fillStyle = this.color
        context.beginPath()
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        context.fill()
        context.closePath()
    }

    resolveGameBorderCollision(gameDimensions) {
        if (this.x - this.radius < 1) {
            this.vel.dx = BALL_MOVE_SPEED
        }
        else if (this.x + this.radius > gameDimensions.width) {
            this.vel.dx = -BALL_MOVE_SPEED
        }

        if (this.y - this.radius < 1) {
            this.vel.dy = BALL_MOVE_SPEED
        }
        else if (this.y + this.radius > gameDimensions.height) {
            this.vel.dy = -BALL_MOVE_SPEED
        }
    }

    update(gameDimensions) {
        this.resolveGameBorderCollision(gameDimensions)

        for (let i = 0; i < this.collisions.length; i++) {
            const collision = this.collisions[i]
            if (collision.entity.type === Entity.Types.Player) {
                this.x += collision.mvtVector.i
                this.y += collision.mvtVector.j

                const player = collision.entity
                if (player.x < this.x) {
                    this.vel.dx = BALL_MOVE_SPEED
                }
                else if (player.x > this.x) {
                    this.vel.dx = -BALL_MOVE_SPEED
                }

                if (player.y < this.y) {
                    this.vel.dy = BALL_MOVE_SPEED
                }
                else if (player.y > this.y) {
                    this.vel.dy = -BALL_MOVE_SPEED
                }
            }
        }

        this.x += this.vel.dx
        this.y += this.vel.dy

        super.update()
    }
}

export default Ball