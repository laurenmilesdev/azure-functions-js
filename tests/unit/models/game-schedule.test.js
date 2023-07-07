import Game from '../../../models/game.js';
import GameSchedule from '../../../models/game-schedule.js';
import { SCHEDULED_GAME_STATUS } from '../../../constants/rapidapi.js';

describe('GameSchedule', () => {
  const gameId = '20230617_DET@MIN';
  const home = 'DET';
  const away = 'MIN';
  const gameTime = '6:40p';
  const gameType = 'REGULAR_SEASON';
  const gameDate = '20230621';

  it('returns GameSchedule model', () => {
    const game = new Game(gameId, SCHEDULED_GAME_STATUS, home, away, gameTime);
    const response = new GameSchedule(game, gameType, gameDate);
    const expectedResponse = {
      game,
      gameType,
      gameDate,
    };

    expect(response).toEqual(expectedResponse);
  });
});
