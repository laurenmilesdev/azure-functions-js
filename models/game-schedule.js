export default class GameSchedule {
  constructor(game, gameType, gameDate, probableStartingPitchers) {
    this.game = game;
    this.gameType = gameType;
    this.gameDate = gameDate;
    this.probableStartingPitchers = probableStartingPitchers;
  }
}
