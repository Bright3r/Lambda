import './style.css'
import Player from './public/Player'
import Wall from './public/Wall'
import EntityManager from './public/EntityManager'
import Ball from './public/Ball'

const GAME_DIMENSIONS = {
  width: innerWidth,
  height: innerHeight
}

const FPS = 60

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
  context.clearRect(0, 0, GAME_DIMENSIONS.width, GAME_DIMENSIONS.height)
}

// TEMP ENTITIES
const player = new Player(400, 400, 50, 100, "red")
const enemy = new Player(400, 200, 50, 100, "green")
const ball = new Ball(200, 200, 30, "yellow")

const manager = new EntityManager()
manager.addEntity(player)
manager.addEntity(enemy)
manager.addEntity(ball)



const gameLoop = () => {
  clearScreen(context)

  manager.update()

  enemy.update(GAME_DIMENSIONS)
  enemy.draw(context)

  player.update(GAME_DIMENSIONS)
  player.draw(context)

  ball.update(GAME_DIMENSIONS)
  ball.draw(context)

  setTimeout(() => {
    requestAnimationFrame(gameLoop)
  }, 1000 / FPS)
}

// -------------> PAGE STARTUP <------------- \\
const canvas = document.getElementById("canvas")
const context = canvas.getContext('2d')
canvas.width = GAME_DIMENSIONS.width
canvas.height = GAME_DIMENSIONS.height

window.addEventListener('keydown', handleKeyDown)
window.addEventListener('keyup', handleKeyUp)

gameLoop()