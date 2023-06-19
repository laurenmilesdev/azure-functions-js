import * as RapidapiConstants from '../../../constants/rapidapi.js';

describe('rapidapi constants', () => {
  it('returns WIN_RESULT constant', () => {
    const response = RapidapiConstants.WIN_RESULT;

    expect(response).toEqual('W');
  });

  it('returns LOSS_RESULT constant', () => {
    const response = RapidapiConstants.LOSS_RESULT;

    expect(response).toEqual('L');
  });

  it('returns NOT_STARTED_GAME_STATUS constant', () => {
    const response = RapidapiConstants.NOT_STARTED_GAME_STATUS;

    expect(response).toEqual('Not Started Yet');
  });

  it('returns IN_PROGRESS_GAME_STATUS constant', () => {
    const response = RapidapiConstants.IN_PROGRESS_GAME_STATUS;

    expect(response).toEqual('Live - In Progress');
  });

  it('returns COMPLETED_GAME_STATUS constant', () => {
    const response = RapidapiConstants.COMPLETED_GAME_STATUS;

    expect(response).toEqual('Completed');
  });
});
