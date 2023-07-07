export default class GameStats {
  constructor(
    game,
    score = undefined,
    hits = undefined,
    currentInning = undefined,
    scoresByInning = undefined,
    errors = undefined,
    winningTeam = undefined,
    losingTeam = undefined
  ) {
    this.game = game;
    this.score = score;
    this.hits = hits;
    this.currentInning = currentInning;
    this.scoresByInning = scoresByInning;
    this.errors = errors;
    this.winningTeam = winningTeam;
    this.losingTeam = losingTeam;
  }
}
