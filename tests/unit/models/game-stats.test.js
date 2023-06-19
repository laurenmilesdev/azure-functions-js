import GameStats from '../../../models/game-stats.js';
import * as RapidapiConstants from '../../../constants/rapidapi.js';

describe('GameStats', () => {
  const gameId = '20230617_DET@MIN';
  const gameTime = '6:40p';

  it('returns GameStats model', () => {
    const response = new GameStats(gameId, RapidapiConstants.NOT_STARTED_GAME_STATUS, gameTime);
    const expectedResponse = {
      game: gameId,
      gameStatus: RapidapiConstants.NOT_STARTED_GAME_STATUS,
      gameTime,
    };

    expect(response).toEqual(expectedResponse);
  });
});
