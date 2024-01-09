import Entity from "./Entity.js";

class Wall extends Entity {
    // (x,y) should refer to top left corner rather than center
    constructor(x, y, width, height) {
        super(x + (width / 2), y + (height / 2), width, height, "blue", Entity.Types.Border, 
           [{ x: x, y: y },
           { x: x, y: y + height },
           { x: x + width, y: y + height },
           { x: x + width, y: y }])
    }

}

export default Wall