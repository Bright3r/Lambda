

class Vector2d {
    constructor(i, j) {
        this.i = i
        this.j = j
    }

    getNormalizedVector() {
        const magnitude = this.getMagnitude()
        if (magnitude === 0) {
            return new Vector2d(0, 0)   // prevent division by 0
        }
        return this.getScaledVector(1 / magnitude)    // scale vector by inverse of its magnitude
    }

    getMagnitude() {
        return Math.sqrt(this.i**2 + this.j**2)
    }

    getScaledVector(scalingFactor) {
        return new Vector2d(scalingFactor * this.i, scalingFactor * this.j)
    }

    dot(otherVec) {
        return (this.i * otherVec.i) + (this.j * otherVec.j)
    }

    cross(otherVec) {
        return (this.x * otherVec.y) - (this.y * otherVec.x)    // returns a scalar since 2d cross product is of form <0, 0, k>
    }

    getNormalVector() {
        return new Vector2d(this.j, -this.i)
    }

}

export default Vector2d