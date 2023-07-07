export default class Game {
  constructor(
    gameId,
    gameStatus,
    homeTeam = undefined,
    awayTeam = undefined,
    gameTime = undefined
  ) {
    this.gameId = gameId;
    this.gameStatus = gameStatus;
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
    this.gameTime = gameTime;
  }
}
