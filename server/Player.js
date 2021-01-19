class Player {
    constructor(name, socketID, score=0){
        this.name = name;
        this.id = socketID;
        this.score = score;
    }

    addScore(){
        this.score += 100;
        this.answered = true;
    }

    decreaseScore(){
        this.score -= 100;
    }
};

module.exports = Player;