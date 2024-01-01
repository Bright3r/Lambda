import './style.css'
import Player from './public/Player'
import Wall from './public/Wall'
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
const borders = Wall.createBorder(GAME_DIMENSIONS.width, GAME_DIMENSIONS.height)

const manager = new EntityManager()
manager.addEntity(player)
manager.addEntity(enemy)
borders.forEach(wall => manager.addEntity(wall))



const gameLoop = () => {
  clearScreen(context)

  manager.update()

  player.update()
  player.draw(context)

  enemy.update()
  enemy.draw(context)

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