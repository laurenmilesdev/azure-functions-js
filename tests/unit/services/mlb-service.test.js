import axios from 'axios';
import MlbService from '../../../services/mlb-service.js';
import Helpers from '../../../helpers/helpers.js';
import GameStats from '../../../models/game-stats.js';
import {
  NOT_STARTED_GAME_STATUS,
  IN_PROGRESS_GAME_STATUS,
  COMPLETED_GAME_STATUS,
} from '../../../constants/rapidapi.js';

jest.mock('axios');

describe('MlbService', () => {
  const rapidApiKey = 'key';
  const rapidApiHost = 'host';
  const mlbService = new MlbService(rapidApiKey, rapidApiHost);
  const helpers = new Helpers();
  const homeTeam = 'MIN';
  const awayTeam = 'DET';
  const game = '20230617_DET@MIN';
  const inProgressCurrentInning = 'Bot 2';
  const inProgressAwayScoresByInning = {
    1: '1',
    2: '0',
    3: '',
    4: '',
    5: '',
    6: '',
    7: '',
    8: '',
    9: '',
  };
  const inProgressHomeScoresByInning = {
    1: '0',
    2: '0',
    3: '',
    4: '',
    5: '',
    6: '',
    7: '',
    8: '',
    9: '',
  };
  const inProgressGameStats = {
    away: awayTeam,
    home: homeTeam,
    lineScore: {
      away: {
        H: '3',
        R: '1',
        team: awayTeam,
        scoresByInning: inProgressAwayScoresByInning,
        E: '0',
      },
      home: {
        H: '2',
        R: '0',
        team: homeTeam,
        scoresByInning: inProgressHomeScoresByInning,
        E: '0',
      },
    },
    currentInning: inProgressCurrentInning,
    gameID: game,
    gameStatus: IN_PROGRESS_GAME_STATUS,
  };

  describe('getRealTimeStatsByTeam', () => {
    it('returns game stats for team if team is playing on current date', async () => {
      const axiosResponse = {
        status: 200,
        data: { body: { [game]: inProgressGameStats } },
      };
      const mock = axios.get.mockResolvedValueOnce(axiosResponse);
      const options = {
        params: {
          gameDate: helpers.getFormattedDateString(new Date()),
        },
        headers: mlbService.headers,
      };
      const expectedResponse = new GameStats(
        game,
        IN_PROGRESS_GAME_STATUS,
        undefined,
        homeTeam,
        awayTeam,
        { MIN: '0', DET: '1' },
        { MIN: '2', DET: '3' },
        inProgressCurrentInning,
        { MIN: inProgressHomeScoresByInning, DET: inProgressAwayScoresByInning },
        { MIN: '0', DET: '0' }
      );
      const response = await mlbService.getRealTimeStatsByTeam(awayTeam);

      expect(mock).toHaveBeenCalledWith(`${mlbService.baseUrl}/getMLBScoresOnly`, options);
      expect(response).toEqual(expectedResponse);
    });

    it('returns error if team is not playing on current date', async () => {
      const axiosResponse = {
        status: 400,
        response: {
          status: 400,
          statusText: 'ERROR',
          data: { messages: 'this is an error message' },
        },
      };
      const mock = axios.get.mockResolvedValueOnce(axiosResponse);
      const options = {
        params: {
          gameDate: helpers.getFormattedDateString(new Date()),
        },
        headers: mlbService.headers,
      };
      const expectedResponse = {
        error: axiosResponse.response,
      };
      const response = await mlbService.getRealTimeStatsByTeam(awayTeam);

      expect(mock).toHaveBeenCalledWith(`${mlbService.baseUrl}/getMLBScoresOnly`, options);
      expect(response).toEqual(expectedResponse);
    });
  });

  describe('checkForStats', () => {
    it('returns game stats for team parameter passed in if game is happening on date', () => {
      const expectedResponse = { stats: 'stats' };
      const body = { '20230616_DET@MIN': expectedResponse };
      const response = mlbService.checkForStats(body, awayTeam);

      expect(response).toEqual(expectedResponse);
    });

    it('returns undefined if team parameter passed in does not have a game on date', () => {
      const expectedResponse = { stats: 'stats' };
      const body = { '20230616_NYY@MIN': expectedResponse };
      const response = mlbService.checkForStats(body, awayTeam);

      expect(response).toEqual(undefined);
    });
  });

  describe('formatStats', () => {
    it('returns correct game stats if game has not started', () => {
      const gameTime = '2:10p';
      const notStartedGameStats = {
        away: awayTeam,
        home: homeTeam,
        teamIDAway: '10',
        teamIDHome: '17',
        gameTime,
        gameTime_epoch: '1687025400.0',
        gameID: game,
        gameStatus: NOT_STARTED_GAME_STATUS,
      };
      const expectedResponse = new GameStats(game, NOT_STARTED_GAME_STATUS, gameTime);
      const response = mlbService.formatStats(notStartedGameStats);

      expect(response).toEqual(expectedResponse);
    });

    it('returns correct game stats if game is in progress', () => {
      const expectedResponse = new GameStats(
        game,
        IN_PROGRESS_GAME_STATUS,
        undefined,
        homeTeam,
        awayTeam,
        { MIN: '0', DET: '1' },
        { MIN: '2', DET: '3' },
        inProgressCurrentInning,
        { MIN: inProgressHomeScoresByInning, DET: inProgressAwayScoresByInning },
        { MIN: '0', DET: '0' }
      );
      const response = mlbService.formatStats(inProgressGameStats);

      expect(response).toEqual(expectedResponse);
    });

    it('returns correct game stats if game has completed', () => {
      const completedCurrentInning = 'Final';
      const completedAwayScoresByInning = {
        1: '1',
        2: '0',
        3: '1',
        4: '0',
        5: '3',
        6: '0',
        7: '0',
        8: '0',
        9: '1',
      };
      const completedHomeScoresByInning = {
        1: '0',
        2: '0',
        3: '2',
        4: '0',
        5: '0',
        6: '0',
        7: '1',
        8: '0',
        9: '0',
      };
      const completedGameStats = {
        away: awayTeam,
        home: homeTeam,
        lineScore: {
          away: {
            H: '10',
            R: '6',
            team: awayTeam,
            scoresByInning: completedAwayScoresByInning,
            E: '0',
          },
          home: {
            H: '5',
            R: '3',
            team: homeTeam,
            scoresByInning: completedHomeScoresByInning,
            E: '1',
          },
        },
        currentInning: completedCurrentInning,
        gameID: game,
        gameStatus: COMPLETED_GAME_STATUS,
      };
      const expectedResponse = new GameStats(
        game,
        COMPLETED_GAME_STATUS,
        undefined,
        homeTeam,
        awayTeam,
        { MIN: '3', DET: '6' },
        { MIN: '5', DET: '10' },
        completedCurrentInning,
        { MIN: completedHomeScoresByInning, DET: completedAwayScoresByInning },
        { MIN: '1', DET: '0' },
        awayTeam,
        homeTeam
      );
      const response = mlbService.formatStats(completedGameStats);

      expect(response).toEqual(expectedResponse);
    });
  });
});
