

class Team {
    constructor(players, color) {
        this.players = players
        this.color = color
        this.score = 0
    }

    addMember(player) {
        this.players.push(player)
    }

    removeMember(player) {
        const idx = this.players.indexOf(player)
        this.players.splice(idx)
    }

}

export default Team