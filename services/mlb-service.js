import ApiService from './api-service.js';
import Helpers from '../helpers/helpers.js';
import {
  COMPLETED_GAME_STATUS,
  NOT_STARTED_GAME_STATUS,
  WIN_RESULT,
} from '../constants/rapidapi.js';

export default class MlbService extends ApiService {
  constructor(context, rapidApiKey, rapidApiHost) {
    super();
    this.context = context;
    this.headers = {
      'X-RapidAPI-Key': rapidApiKey,
      'X-RapidAPI-Host': rapidApiHost,
    };
    this.baseUrl = `https://${rapidApiHost}`;
    this.helpers = new Helpers();
  }

  async getRealTimeStatsByTeam(team, date) {
    let stats;
    const url = `${this.baseUrl}/getMLBScoresOnly`;
    const options = {
      params: {
        gameDate: date || this.helpers.getFormattedDateString(new Date()),
      },
      headers: this.headers,
    };

    const response = await super.get(url, options);
    const { status } = response;

    if (status && status === 200) {
      const { body } = response.data;
      const rawStats = this.checkForStats(body, team);

      stats = this.formatStats(rawStats);
    } else {
      const errorResponse = response.response;

      stats = {
        error: {
          status: errorResponse.status,
          statusText: errorResponse.statusText,
          data: errorResponse.data,
        },
      };
    }

    return stats;
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

    if (gameStatus === NOT_STARTED_GAME_STATUS) {
      return {
        game: stats.gameID,
        gameStatus,
        gameTime: stats.gameTime,
      };
    }

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
