import HttpTriggerExample from '../../DetroitTigersStartingLineupHttpTrigger/index.js';

const context = {
  log: jest.fn(),
};
context.log.error = jest.fn();

describe('execute', () => {
  it('is a function', () => {
    expect(typeof HttpTriggerExample).toBe('function');
  });
});
