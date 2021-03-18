class Player {
    constructor(name, id = Utils.getNewId('player-'), scores = []) {
        this.name = name;
        this.id = id;
        this.scores = scores;
      }
   
}