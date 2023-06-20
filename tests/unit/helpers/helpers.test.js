import Helpers from '../../../helpers/helpers.js';

describe('Helpers', () => {
  const helpers = new Helpers();

  describe('getFormattedDateString', () => {
    it('returns formatted date string', () => {
      const date = new Date('2023-06-16T03:24:00');
      const response = helpers.getFormattedDateString(date);

      expect(response).toEqual('20230616');
    });
  });

  describe('getTeamNameFromAbbr', () => {
    it('returns team name from abbreviation', () => {
      const abbr = 'DET';
      const expectedRespone = 'Detroit Tigers';
      const response = helpers.getTeamNameFromAbbr(abbr);

      expect(response).toEqual(expectedRespone);
    });
  });
});
