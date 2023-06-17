import MLB_TEAMS from '../constants/mlb-teams.js';

export default class Helpers {
  getFormattedDateString(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) month = `0${month}`;
    if (day < 10) day = `0${day}`;

    return `${date.getFullYear()}${month}${day}`;
  }

  getTeamNameFromAbbr(abbr) {
    let team;

    Object.keys(MLB_TEAMS).forEach((mlbTeamAbbr) => {
      if (abbr === mlbTeamAbbr) {
        team = MLB_TEAMS[mlbTeamAbbr];
      }
    });

    return team;
  }
}
