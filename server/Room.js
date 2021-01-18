class Room{
    constructor(key, survey, users, answered = 0){
        this.key = key;
        this.survey = survey;
        this.users = users;
        this.answered = answered;
    }

    answeredQuestion() {
        this.answered ++;
        return this.answered;
    }

    reset() {
        this.answered = 0;
    }
}

module.exports = Room;