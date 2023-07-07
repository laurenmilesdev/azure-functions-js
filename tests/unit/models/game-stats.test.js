import Game from '../../../models/game.js';
import GameStats from '../../../models/game-stats.js';
import { COMPLETED_GAME_STATUS } from '../../../constants/rapidapi.js';

describe('GameStats', () => {
  const gameId = '20230617_DET@MIN';
  const home = 'DET';
  const away = 'MIN';
  const gameTime = '6:40p';
  const game = new Game(gameId, COMPLETED_GAME_STATUS, home, away, gameTime);
  const currentInning = 'Final';
  const awayScoresByInning = {
    1: '1',
    2: '0',
    3: '0',
    4: '0',
    5: '0',
    6: '0',
    7: '0',
    8: '0',
    9: '0',
  };
  const homeScoresByInning = {
    1: '0',
    2: '0',
    3: '0',
    4: '0',
    5: '0',
    6: '0',
    7: '0',
    8: '0',
    9: '0',
  };
  const gameStats = {
    away,
    home,
    lineScore: {
      away: {
        H: '3',
        R: '1',
        team: away,
        scoresByInning: awayScoresByInning,
        E: '0',
      },
      home: {
        H: '2',
        R: '0',
        team: home,
        scoresByInning: homeScoresByInning,
        E: '0',
      },
    },
    currentInning,
    gameID: game,
    gameStatus: COMPLETED_GAME_STATUS,
  };
  const score = { [home]: gameStats.lineScore.home.R, [away]: gameStats.lineScore.away.R };
  const hits = { [home]: gameStats.lineScore.home.H, [away]: gameStats.lineScore.away.H };
  const scoresByInning = {
    [home]: gameStats.lineScore.home.scoresByInning,
    [away]: gameStats.lineScore.away.scoresByInning,
  };
  const errors = { [home]: gameStats.lineScore.home.E, [away]: gameStats.lineScore.away.E };

  it('returns GameStats model', () => {
    const response = new GameStats(
      game,
      score,
      hits,
      currentInning,
      scoresByInning,
      errors,
      away,
      home
    );
    const expectedResponse = {
      game,
      score,
      hits,
      currentInning,
      scoresByInning,
      errors,
      winningTeam: away,
      losingTeam: home,
    };

    expect(response).toEqual(expectedResponse);
  });
});
