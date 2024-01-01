import './style.css'
import Player from './public/Player'
import Convex from './public/utils/Convex'
import EntityManager from './public/EntityManager'

const GAME_DIMENSIONS = {
  width: innerWidth,
  height: innerHeight
}

const handleKeyDown = e => {
  switch (e.code) {
      case "KeyW":
          player.vel.dyUp = -1
          break
      case "KeyA":
          player.vel.dxLeft = -1
          break
      case "KeyS":
          player.vel.dyDown = 1
          break
      case "KeyD":
          player.vel.dxRight = 1
          break
  }
}

const handleKeyUp = e => {
  switch (e.code) {
      case "KeyW":
          player.vel.dyUp = 0
          break
      case "KeyA":
          player.vel.dxLeft = 0
          break
      case "KeyS":
          player.vel.dyDown = 0
          break
      case "KeyD":
          player.vel.dxRight = 0
          break
  }
}

const clearScreen = (context) => {
  context.clearRect(0, 0, canvas.width, canvas.height)
}

// TEMP ENTITIES
const player = new Player(400, 400, 25, 100, "red")
const enemy = new Player(500, 500, 25, 100, "green")

const manager = new EntityManager()
manager.addEntity(player)
manager.addEntity(enemy)

// const points = [
//   { x: 100, y: 100 },
//   { x: 120, y: 100 },
//   { x: 130, y: 200 },
//   { x: 110, y: 200 }
// ]
// const points2 = [
//   { x: 120, y: 150 },
//   { x: 220, y: 200 },
//   { x: 220, y: 300 },
//   { x: 200, y: 300 }
// ]
// const testHitbox = new Convex(points)
// const testHitbox2 = new Convex(points2)
// console.log(testHitbox.isColliding(testHitbox2))







const gameLoop = () => {
  clearScreen(context)

  manager.update()

  player.update(GAME_DIMENSIONS)
  player.draw(context)

  enemy.draw(context)

  // testHitbox.draw(context)
  // testHitbox2.draw(context)

  requestAnimationFrame(gameLoop)
}

// -------------> PAGE STARTUP <------------- \\
const canvas = document.getElementById("canvas")
const context = canvas.getContext('2d')
canvas.width = GAME_DIMENSIONS.width
canvas.height = GAME_DIMENSIONS.height

window.addEventListener('keydown', handleKeyDown)
window.addEventListener('keyup', handleKeyUp)

gameLoop()