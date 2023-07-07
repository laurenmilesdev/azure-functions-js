import Error from '../../../models/error.js';

describe('GameSchedule', () => {
  const status = 'status';
  const statusText = 'status text';
  const data = { key: 'value' };

  it('returns Error model', () => {
    const response = new Error(status, statusText, data);
    const expectedResponse = {
      status,
      statusText,
      data,
    };

    expect(response).toEqual(expectedResponse);
  });
});
