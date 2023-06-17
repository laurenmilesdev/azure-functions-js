import ApiService from './api-service.js';
import Helpers from '../helpers/helpers.js';
import GameStats from '../models/game-stats.js';
import {
  COMPLETED_GAME_STATUS,
  NOT_STARTED_GAME_STATUS,
  WIN_RESULT,
} from '../constants/rapidapi.js';

export default class MlbService extends ApiService {
  constructor(rapidApiKey, rapidApiHost) {
    super();
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
    const { body } = response.data;

    if (status && status === 200 && body) {
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

    Object.keys(body).forEach((game) => {
      if (game.toUpperCase().includes(team.toUpperCase())) {
        stats = body[game];
      }
    });

    return stats;
  }

  formatStats(stats) {
    const { gameStatus } = stats;

    if (gameStatus === NOT_STARTED_GAME_STATUS)
      return new GameStats(stats.gameID, gameStatus, stats.gameTime);

    const { home } = stats;
    const { away } = stats;
    const { lineScore } = stats;
    const formattedStats = new GameStats(
      stats.gameID,
      gameStatus,
      undefined,
      home,
      away,
      { [home]: lineScore.home.R, [away]: lineScore.away.R },
      { [home]: lineScore.home.H, [away]: lineScore.away.H },
      stats.currentInning,
      { [home]: lineScore.home.scoresByInning, [away]: lineScore.away.scoresByInning },
      { [home]: lineScore.home.E, [away]: lineScore.away.E }
    );

    if (gameStatus === COMPLETED_GAME_STATUS) {
      const homeWin = stats.homeResult === WIN_RESULT;

      formattedStats.winningTeam = homeWin ? home : away;
      formattedStats.losingTeam = homeWin ? away : home;
    }

    return formattedStats;
  }
}
