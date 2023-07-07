import { X_RAPIDAPI_KEY, X_RAPIDAPI_HOST } from '../config.js';
import MlbService from '../services/mlb-service.js';
import Helpers from '../helpers/helpers.js';

// eslint-disable-next-line func-names
export default async function (context, req) {
  context.log('TeamScheduleHttpTrigger function processed a request.');

  let schedule = {};
  let status = 200;
  const team = req.query.team || (req.body && req.body.team);
  const season = req.query.season || (req.body && req.body.season);
  const mlbService = new MlbService(X_RAPIDAPI_KEY, X_RAPIDAPI_HOST);
  const helpers = new Helpers();
  const teamExists = helpers.getTeamNameFromAbbr(team);

  if (team && teamExists) {
    schedule = await mlbService.getTeamSchedule(team, season);

    context.log(
      schedule.error
        ? `There was an error fetching schedule: ${schedule.error}`
        : 'Successfully fetched schedule.'
    );
  } else {
    const error =
      'Missing or incorrect "team" parameter. Please pass in a team abbreviation and make sure it is correct.';
    status = 400;
    schedule = { error };

    context.log.error(error);
  }

  context.res = {
    status,
    body: schedule,
  };
}
