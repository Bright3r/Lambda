import './style.css'
import Player from './public/Player'
import GameManager from './public/GameManager'
import Ball from './public/Ball'
import Goal from './public/Goal'
import Team from './public/Team'

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
const player = new Player(400, 400, 50, "red")
const enemy = new Player(400, 200, 50, "green")
const ball = new Ball(200, 200, 30, "yellow")

const redTeam = new Team([player], "red")
const greenTeam = new Team([enemy], "green")
const goal1 = new Goal(100, (GAME_DIMENSIONS.height / 2) - 50, 25, 200, "green", greenTeam)
const goal2 = new Goal(GAME_DIMENSIONS.width - 100, (GAME_DIMENSIONS.height / 2) - 50, 25, 200, "red", redTeam)

const manager = new GameManager(redTeam, greenTeam, GAME_DIMENSIONS)
manager.addEntity(player)
manager.addEntity(enemy)
manager.addEntity(ball)
manager.addEntity(goal1)
manager.addEntity(goal2)


const gameLoop = () => {
  clearScreen(context)

  manager.update(context, GAME_DIMENSIONS)

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