import Player from './objects/Player.js'
import GameManager from './objects/GameManager.js'
import Ball from './objects/Ball.js'
import Goal from './objects/Goal.js'
import Team from './objects/Team.js'

const GAME_DIMENSIONS = {
	width: innerWidth,
	height: innerHeight
}
const FPS = 60

const handleKeyDown = e => {
	switch (e.code) {
		case "KeyW":
			player1.vel.dyUp = -1
			break
		case "KeyA":
			player1.vel.dxLeft = -1
			break
		case "KeyS":
			player1.vel.dyDown = 1
			break
		case "KeyD":
			player1.vel.dxRight = 1
			break
		case "KeyI":
			player2.vel.dyUp = -1
			break
		case "KeyJ":
			player2.vel.dxLeft = -1
			break
		case "KeyK":
			player2.vel.dyDown = 1
			break
		case "KeyL":
			player2.vel.dxRight = 1
			break
	}
}

const handleKeyUp = e => {
	switch (e.code) {
		case "KeyW":
			player1.vel.dyUp = 0
			break
		case "KeyA":
			player1.vel.dxLeft = 0
			break
		case "KeyS":
			player1.vel.dyDown = 0
			break
		case "KeyD":
			player1.vel.dxRight = 0
			break
		case "KeyI":
			player2.vel.dyUp = 0
			break
		case "KeyJ":
			player2.vel.dxLeft = 0
			break
		case "KeyK":
			player2.vel.dyDown = 0
			break
		case "KeyL":
			player2.vel.dxRight = 0
			break
	}
}

const clearScreen = () => {
	context.clearRect(0, 0, GAME_DIMENSIONS.width, GAME_DIMENSIONS.height)
}

const goal1Pos = { x: 125, y: GAME_DIMENSIONS.height / 2 }
const goal2Pos = { x: GAME_DIMENSIONS.width - 125, y: GAME_DIMENSIONS.height / 2 }

const player1 = new Player(goal1Pos.x + 100, goal1Pos.y, 25, "red")
const player2 = new Player(goal2Pos.x - 100, goal2Pos.y, 25, "green")
const ball = new Ball(GAME_DIMENSIONS.width / 2, GAME_DIMENSIONS.height / 2, 30, "yellow")

const redTeam = new Team([player1], "red")
const greenTeam = new Team([player2], "green")
const goal1 = new Goal(goal1Pos.x, goal1Pos.y, 25, 200, "white", greenTeam)
const goal2 = new Goal(goal2Pos.x, goal1Pos.y, 25, 200, "white", redTeam)

const manager = new GameManager(redTeam, greenTeam, GAME_DIMENSIONS)
manager.addEntity(player1)
manager.addEntity(player2)
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
	manager.handleSwords()
	setTimeout(gameLoop, 1000)
}

// -------------> PAGE STARTUP <------------- \\
const canvas = document.getElementById("canvas")
const context = canvas.getContext('2d')
canvas.width = GAME_DIMENSIONS.width
canvas.height = GAME_DIMENSIONS.height

const startGame = () => {
	window.addEventListener('keydown', handleKeyDown)
	window.addEventListener('keyup', handleKeyUp)
	
	gameLoop()
}

const drawInstructions = () => {	
	const lineHeight = 15
	context.lineHeight = lineHeight
	context.font = "25px Courier New"
	context.fillText("Player1 uses WASD to move", GAME_DIMENSIONS.width / 2, GAME_DIMENSIONS.height / 2)
	context.fillText("Player2 uses IJKL to move", GAME_DIMENSIONS.width / 2, GAME_DIMENSIONS.height / 2 + (lineHeight * 2))
	context.fillText("Whoever is losing gets a sword", GAME_DIMENSIONS.width / 2, GAME_DIMENSIONS.height / 2 + (lineHeight * 4))
	context.fillText("Control the sword with your mouse", GAME_DIMENSIONS.width / 2, GAME_DIMENSIONS.height / 2 + (lineHeight * 6))
}

const drawStart = () => {
	context.fillStyle = "white"
	context.font = "50px Courier New"
	context.textAlign = "center"
	context.fillText("Press Enter to Start", GAME_DIMENSIONS.width / 2, GAME_DIMENSIONS.height / 4)
}

const startupInstructions = () => {
	window.addEventListener('keydown', e => {
		if (e.code === "Enter") {
			setTimeout(() => startGame(), 250)
			clearInterval(instructionsInterval)
		}
	}, { once: true })

	const instructionsInterval = setInterval(() => {
		drawStart()
		drawInstructions()

		// arcade blinking effect
		setTimeout(() => {
			clearScreen()
			drawInstructions()
		}, 250)

	}, 500)
}

startupInstructions()