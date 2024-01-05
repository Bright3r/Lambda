import Entity from './Entity.js'

const WIDTH = 15
const LENGTH = 100

class Sword extends Entity {
    constructor(x, y, color,) {
        super(x, y, WIDTH, WIDTH, color, Entity.Types.Weapon,
            [{ x: x + WIDTH, y: y + WIDTH },
            { x: x + WIDTH, y: y - WIDTH },
            { x: x - WIDTH, y: y - WIDTH },
            { x: x - WIDTH, y: y + WIDTH }])
        this.length = LENGTH
        this.mouseX = x + 50
        this.mouseY = y
        
        const handleMouseMove = e => {
            this.mouseX = e.clientX
            this.mouseY = e.clientY
        }
        window.addEventListener('mousemove', handleMouseMove)
    }

    getSwordDirectionVector() {
        const dx = this.mouseX - this.x
        const dy = this.mouseY - this.y

        const dist = Math.sqrt(dx**2 + dy**2)
        const scalingFactor = this.length / dist
        const swordTipX = dx * scalingFactor
        const swordTipY = dy * scalingFactor
        return { swordTipX, swordTipY }
    }

    positionToHitbox() {
        // a sword is just a line from the player in the direction of the cursor
        const { swordTipX, swordTipY } = this.getSwordDirectionVector()   
        const angle = -Math.atan2(swordTipY, swordTipX)
        // offsets needed to construct a rectangular hitbox for sword
        const swordOffsets = { 
            dx: Math.sin(angle) * (this.width / 2), 
            dy: Math.cos(angle) * (this.width / 2) 
        }

        const p1 = { x: this.x + swordOffsets.dx, y: this.y + swordOffsets.dy }
        const p2 = { x: p1.x + swordTipX, y: p1.y + swordTipY } 
        const p3 = { x: p2.x - (2 * swordOffsets.dx), y: p2.y - (2 * swordOffsets.dy)}
        const p4 = { x: p3.x - swordTipX, y: p3.y - swordTipY }

        return [p1, p2, p3, p4]
    }

    update(x, y) {
        if (y !== undefined) {  // only update if both arguments passed
            this.x = x
            this.y = y
    
            super.update(this.positionToHitbox())
        }
    }

}

export default Sword