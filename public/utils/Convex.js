import Vector2d from './Vector2d'
import Projection from './Projection'

class Convex {
    // points must be given such that if the shape is created
    // by line segments ABCD, points [A, B, C, D] are given
    constructor(points) {
        this.points = points
    }

    print() {
        console.log("hi")
    }

    decomposeShapeToVectors() {
        let vectors = []
        for (let idx = 1; idx < this.points.length; idx++) {
            const vector = new Vector2d(
                this.points[idx].x - this.points[idx - 1].x,
                this.points[idx].y - this.points[idx - 1].y
            )
            vectors.push(vector)
        }

        // the line segment between the last point and first point must be reconstructed
        const finalVector = new Vector2d(
            this.points[this.points.length - 1].x - this.points[0].x,
            this.points[this.points.length - 1].y - this.points[0].y
        )
        vectors.push(finalVector)

        return vectors
    }

    getAxes() {
        let normalVectors = []
        const vectors = this.decomposeShapeToVectors()
        vectors.forEach(vec => {
            const normalVector = vec.getNormalVector()
            normalVectors.push(normalVector.getNormalizedVector())  // axis vector must be a unit vector (normalized)
        })
        return normalVectors
    }

    isColliding(otherConvex) {
        const allAxes = this.getAxes().concat(otherConvex.getAxes())

        for (let idx = 0; idx < allAxes.length; idx++) {
            const axis = allAxes.at(idx)
            if (!this.isOverlappingOnAxis(axis, otherConvex)) {
                return false
            }
        }
        return true
    }

    isOverlappingOnAxis(axis, otherConvex) {
        const proj1 = this.project(axis)
        const proj2 = otherConvex.project(axis)
        return proj1.isOverlapping(proj2)
    }

    project(axis) {
        let min = Number.MAX_SAFE_INTEGER
        let max = Number.MIN_SAFE_INTEGER
        this.points.forEach(point => {
            const pointAsVec = new Vector2d(point.x, point.y)
            const dotProduct = pointAsVec.dot(axis)
            if (dotProduct < min) {
                min = dotProduct
            }
            if (dotProduct > max) {
                max = dotProduct
            }
        })
        return new Projection(min, max)
    }

    draw(context, color) {
        context.fillStyle = color
        context.beginPath()
        context.moveTo(this.points[0].x, this.points[0].y)
        for (let idx = 1; idx < this.points.length; idx++) {
            context.lineTo(this.points[idx].x, this.points[idx].y)
        }
        context.lineTo(this.points[0].x, this.points[0].y)
        context.fill()
    }
}

export default Convex