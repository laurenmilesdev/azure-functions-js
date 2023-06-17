import { COMPLETED_GAME_STATUS, WIN_RESULT } from '../constants/rapidapi.js';

export default class FormatHelper {
  formatStats(stats) {
    const { gameStatus } = stats;
    const { home } = stats;
    const { away } = stats;
    const formattedStats = {
      homeTeam: home,
      awayTeam: away,
      score: {
        [home]: stats.lineScore.home.R,
        [away]: stats.lineScore.away.R,
      },
      hits: {
        [home]: stats.lineScore.home.H,
        [away]: stats.lineScore.away.H,
      },
      gameStatus,
      currentInning: stats.currentInning,
      scoresByInning: {
        [home]: stats.lineScore.home.scoresByInning,
        [away]: stats.lineScore.away.scoresByInning,
      },
      errors: {
        [home]: stats.lineScore.home.E,
        [away]: stats.lineScore.away.E,
      },
    };

    if (gameStatus === COMPLETED_GAME_STATUS) {
      const homeWin = stats.homeResult === WIN_RESULT;

      formattedStats.win = homeWin ? home : away;
      formattedStats.loss = homeWin ? away : home;
    }

    return formattedStats;
  }
}
