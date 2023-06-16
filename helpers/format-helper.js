export default class FormatHelper {
  formatStats(stats) {
    return {
      homeTeam: stats.home,
      awayTeam: stats.away,
      score: {
        [stats.home]: stats.lineScore.home.R,
        [stats.away]: stats.lineScore.away.R,
      },
      hits: {
        [stats.home]: stats.lineScore.home.H,
        [stats.away]: stats.lineScore.away.H,
      },
      gameStatus: stats.gameStatus,
      currentInning: stats.currentInning,
    };
  }
}
