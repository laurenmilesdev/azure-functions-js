import { X_RAPIDAPI_KEY, X_RAPIDAPI_HOST } from '../config.js';
import MlbService from '../services/mlb-service.js';
import Helpers from '../helpers/helpers.js';

// eslint-disable-next-line func-names
export default async function (context, req) {
  context.log('GameStatsHttpTrigger function processed a request.');

  let stats = {};
  let status = 200;
  const team = req.query.team || (req.body && req.body.team);
  const date = req.query.date || (req.body && req.body.date);
  const mlbService = new MlbService(X_RAPIDAPI_KEY, X_RAPIDAPI_HOST);
  const helpers = new Helpers();
  const teamExists = helpers.getTeamNameFromAbbr(team);

  if (team && teamExists) {
    stats = await mlbService.getRealTimeStatsByTeam(team, date);

    context.log(
      stats.error
        ? `There was an error fetching stats: ${stats.error}`
        : 'Successfully fetched stats.'
    );
  } else {
    const error =
      'Missing or incorrect "team" parameter. Please pass in a team abbreviation and make sure it is correct.';
    status = 400;
    stats = { error };

    context.log.error(error);
  }

  context.res = {
    status,
    body: stats,
  };
}
