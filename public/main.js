import '../style.css'
import Player from './objects/Player'
import GameManager from './objects/GameManager'
import Ball from './objects/Ball'
import Goal from './objects/Goal'
import Team from './objects/Team'

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

const goal1Pos = { x: 125, y: GAME_DIMENSIONS.height / 2 }
const goal2Pos = { x: GAME_DIMENSIONS.width - 125, y: GAME_DIMENSIONS.height / 2 }

const player = new Player(goal1Pos.x + 100, goal1Pos.y, 50, "red")
const enemy = new Player(goal2Pos.x - 100, goal2Pos.y, 50, "green")
const ball = new Ball(GAME_DIMENSIONS.width / 2, GAME_DIMENSIONS.height / 2, 30, "yellow")

const redTeam = new Team([player], "red")
const greenTeam = new Team([enemy], "green")
const goal1 = new Goal(goal1Pos.x, goal1Pos.y, 25, 200, "white", greenTeam)
const goal2 = new Goal(goal2Pos.x, goal1Pos.y, 25, 200, "white", redTeam)

const manager = new GameManager(redTeam, greenTeam, GAME_DIMENSIONS)
manager.addEntity(player)
manager.addEntity(enemy)
manager.addEntity(ball)
manager.addEntity(goal1)
manager.addEntity(goal2)

const gameLoop = () => {
	setTimeout(() => {
		clearScreen(context)
		const isGoalScored = manager.update(context, GAME_DIMENSIONS)
		if (isGoalScored) {
			reset()
		}
		else {
			gameLoop()
		}
	}, 1000 / FPS)
}

const reset = () => {
	manager.resetEntities()
	setTimeout(gameLoop, 1000)
}

// -------------> PAGE STARTUP <------------- \\
const canvas = document.getElementById("canvas")
const context = canvas.getContext('2d')
canvas.width = GAME_DIMENSIONS.width
canvas.height = GAME_DIMENSIONS.height

window.addEventListener('keydown', handleKeyDown)
window.addEventListener('keyup', handleKeyUp)

gameLoop()