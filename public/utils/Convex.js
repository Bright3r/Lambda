import Vector2d from './Vector2d.js'
import Projection from './Projection.js'

class Convex {
    // points must be given such that if the shape is created
    // by line segments ABCD, points [A, B, C, D] are given
    constructor(points) {
        this.points = points
    }

    // constructs an equilateral polygon and returns its Convex
    static constructPolygon(x, y, sideLength, numSides, rotationAngle) {
        const radius = sideLength / (2 * Math.sin(Math.PI / numSides))

        let vertices = []
        for (let i = 0; i < numSides; i++) {
            const theta = (Math.PI * 2 * i) / numSides
            // calculations to find angle of rotation + offset for polygon angle
            // to behave as expected (makes 0 degrees )
            const totalDegreesInShape = 180 * (numSides - 2)
            const degreeOffset = totalDegreesInShape / (numSides * 2)
            const rotationAngleInRadians = (rotationAngle + degreeOffset) * Math.PI / 180
            vertices.push({
                x: x + (radius * Math.cos(theta + rotationAngleInRadians)),
                y: y + (radius * Math.sin(theta + rotationAngleInRadians))
            })
        }
        return vertices
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

    getCollision(otherConvex) {
        const allAxes = this.getAxes().concat(otherConvex.getAxes())
        let mvtVector = null
        let mvtMagnitude = Number.MAX_SAFE_INTEGER

        for (let idx = 0; idx < allAxes.length; idx++) {
            const axis = allAxes[idx]
            const overlap = this.getOverlapOnAxis(axis, otherConvex)
            if (overlap < 0) {  // this means there is no overlap so there is a separating axis
                return {
                    isColliding: false,
                    mvtVector: null,
                    mvtMagnitude: null
                }
            }
            if (overlap < mvtMagnitude) {
                mvtMagnitude = overlap
                mvtVector = axis
            }
        }
        return { 
            isColliding: true,
            mvtVector,
            mvtMagnitude
        }
    }

    getOverlapOnAxis(axis, otherConvex) {
        const proj1 = this.project(axis)
        const proj2 = otherConvex.project(axis)
        return proj1.getOverlap(proj2)
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
            const nextPoint = this.points[idx % this.points.length]
            context.lineTo(nextPoint.x, nextPoint.y)
        }
        context.fill()
    }
}

export default Convex