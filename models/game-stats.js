export default class GameStats {
  constructor(
    game,
    gameStatus,
    gameTime,
    homeTeam = undefined,
    awayTeam = undefined,
    score = undefined,
    hits = undefined,
    currentInning = undefined,
    scoresByInning = undefined,
    errors = undefined,
    winningTeam = undefined,
    losingTeam = undefined
  ) {
    this.game = game;
    this.gameStatus = gameStatus;
    this.gameTime = gameTime;
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
    this.score = score;
    this.hits = hits;
    this.currentInning = currentInning;
    this.scoresByInning = scoresByInning;
    this.errors = errors;
    this.winningTeam = winningTeam;
    this.losingTeam = losingTeam;
  }
}
