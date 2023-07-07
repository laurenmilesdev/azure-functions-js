import ApiService from './api-service.js';
import Helpers from '../helpers/helpers.js';
import Game from '../models/game.js';
import GameSchedule from '../models/game-schedule.js';
import GameStats from '../models/game-stats.js';
import Error from '../models/error.js';
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

  async getTeamSchedule(team, season = undefined) {
    let schedule;
    const currentSeason = new Date().getFullYear().toString();
    const url = `${this.baseUrl}/getMLBTeamSchedule`;
    const options = {
      params: {
        teamAbv: team,
        season: season || currentSeason,
      },
      headers: this.headers,
    };
    const response = await super.get(url, options);
    const { status } = response;

    if (status && status === 200) {
      const { error } = response.data;
      const { body } = response.data;

      if (error) schedule = { error: new Error(status, response.statusText, error) };
      else schedule = await this.formatSchedule(body.schedule);
    } else {
      const errorResponse = response.response;
      schedule = {
        error: new Error(errorResponse.status, errorResponse.statusText, errorResponse.data),
      };
    }

    return schedule;
  }

  async getRealTimeStatsByTeam(team, date = undefined) {
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
        error: new Error(errorResponse.status, errorResponse.statusText, errorResponse.data),
      };
    }

    return stats;
  }

  async getPlayerInformation(playerId = undefined) {
    let playerInformation;
    const url = `${this.baseUrl}/getMLBPlayerInfo`;
    const options = {
      params: { playerID: playerId },
      headers: this.headers,
    };
    const response = await super.get(url, options);
    const { status } = response;

    if (status && status === 200) {
      const { body } = response.data;

      playerInformation = body;
    } else {
      const errorResponse = response.response;
      playerInformation = {
        error: new Error(errorResponse.status, errorResponse.statusText, errorResponse.data),
      };
    }

    return playerInformation;
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

  async formatSchedule(scheduledGames) {
    const schedule = [];

    scheduledGames.map(async (scheduledGame) => {
      const { probableStartingPitchers } = scheduledGame;
      const game = new Game(
        scheduledGame.gameID,
        scheduledGame.gameStatus,
        scheduledGame.home,
        scheduledGame.away,
        scheduledGame.gameTime
      );

      // Maxes out free API call limit
      // if (probableStartingPitchers && probableStartingPitchers.away !== '') {
      //   const awayStartingPitcher = await this.getPlayerInformation(probableStartingPitchers.away);

      //   if (awayStartingPitcher) probableStartingPitchers.away = awayStartingPitcher.longName;
      // }

      // if (probableStartingPitchers && probableStartingPitchers.home !== '') {
      //   const homeStartingPitcher = await this.getPlayerInformation(probableStartingPitchers.home);

      //   if (homeStartingPitcher) probableStartingPitchers.home = homeStartingPitcher.longName;
      // }

      schedule.push(
        new GameSchedule(
          game,
          scheduledGame.gameType,
          scheduledGame.gameDate,
          probableStartingPitchers
        )
      );
    });

    return schedule;
  }

  formatStats(stats) {
    const { gameStatus } = stats;
    const { home } = stats;
    const { away } = stats;
    const game = new Game(stats.gameID, gameStatus, home, away, stats.gameTime || undefined);

    if (gameStatus === NOT_STARTED_GAME_STATUS) return new GameStats(game);

    const { lineScore } = stats;
    const formattedStats = new GameStats(
      game,
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
