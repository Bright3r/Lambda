

class Projection {
    constructor(min, max) {
        this.min = min
        this.max = max
    }

    isOverlapping(otherProjection) {
        return (this.min >= otherProjection.min && this.min <= otherProjection.max) ||
            (otherProjection.min >= this.min && otherProjection.min <= this.max)
    }
}

export default Projection