import Game from '../../../models/game.js';
import { SCHEDULED_GAME_STATUS } from '../../../constants/rapidapi.js';

describe('Game', () => {
  const gameId = '20230617_DET@MIN';
  const home = 'DET';
  const away = 'MIN';
  const gameTime = '6:40p';

  it('returns Game model', () => {
    const response = new Game(gameId, SCHEDULED_GAME_STATUS, home, away, gameTime);
    const expectedResponse = {
      gameId,
      gameStatus: SCHEDULED_GAME_STATUS,
      homeTeam: home,
      awayTeam: away,
      gameTime,
    };

    expect(response).toEqual(expectedResponse);
  });
});
