import ApiService from './api-service.js';
import Helpers from '../helpers/helpers.js';

export default class MlbService extends ApiService {
  constructor(context, rapidApiKey, rapidApiHost) {
    super();
    this.context = context;
    this.headers = {
      'X-RapidAPI-Key': rapidApiKey,
      'X-RapidAPI-Host': rapidApiHost,
    };
    this.baseUrl = `https://${rapidApiHost}`;
    this.helpers = new Helpers();
  }

  async getRealTimeStatsByTeam(team, date) {
    let stats;
    const url = `${this.baseUrl}/getMLBScoresOnly`;
    const options = {
      params: {
        gameDate: date || this.helpers.getCurrentDateString(),
      },
      headers: this.headers,
    };

    const response = await super.get(url, options);
    const { status } = response;

    if (status && status === 200) {
      const { body } = response.data;
      const rawStats = this.helpers.checkForStats(body, team);

      stats = this.helpers.formatStats(rawStats);
    } else {
      const errorResponse = response.response;

      stats = {
        error: {
          status: errorResponse.status,
          statusText: errorResponse.statusText,
          data: errorResponse.data,
        },
      };
    }

    return stats;
  }
}
