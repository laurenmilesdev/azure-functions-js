import { COMPLETED_GAME_STATUS, WIN_RESULT } from '../constants/rapidapi.js';
import MLB_TEAMS from '../constants/mlb-teams.js';

export default class Helpers {
  getCurrentDateString() {
    const date = new Date();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) month = `0${month}`;
    if (day < 10) day = `0${day}`;

    return `${date.getFullYear()}${month}${day}`;
  }

  checkForStats(body, team) {
    let stats;
    const games = Object.keys(body);

    games.forEach((game) => {
      if (game.toUpperCase().includes(team.toUpperCase())) {
        stats = body[game];
      }
    });

    return stats;
  }

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

  getTeamNameFromAbbr(abbr) {
    let team;

    Object.keys(MLB_TEAMS).forEach((mlbTeamAbbr) => {
      if (abbr === mlbTeamAbbr) {
        team = MLB_TEAMS[mlbTeamAbbr];
      }
    });

    return team;
  }
}
