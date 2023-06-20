import MLB_TEAMS from '../../../constants/mlb-teams.js';

describe('mlb-teams constants', () => {
  it('returns ARI team name', () => {
    const response = MLB_TEAMS.ARI;

    expect(response).toEqual('Arizona Diamondbacks');
  });

  it('returns ATL team name', () => {
    const response = MLB_TEAMS.ATL;

    expect(response).toEqual('Atlanta Braves');
  });

  it('returns BAL team name', () => {
    const response = MLB_TEAMS.BAL;

    expect(response).toEqual('Baltimore Orioles');
  });

  it('returns BOS team name', () => {
    const response = MLB_TEAMS.BOS;

    expect(response).toEqual('Boston Red Sox');
  });

  it('returns CHC team name', () => {
    const response = MLB_TEAMS.CHC;

    expect(response).toEqual('Chicago Cubs');
  });

  it('returns CHW team name', () => {
    const response = MLB_TEAMS.CHW;

    expect(response).toEqual('Chicago White Sox');
  });

  it('returns CIN team name', () => {
    const response = MLB_TEAMS.CIN;

    expect(response).toEqual('Cincinnati Reds');
  });

  it('returns CLE team name', () => {
    const response = MLB_TEAMS.CLE;

    expect(response).toEqual('Cleveland Guardians');
  });

  it('returns COL team name', () => {
    const response = MLB_TEAMS.COL;

    expect(response).toEqual('Colorado Rockies');
  });

  it('returns DET team name', () => {
    const response = MLB_TEAMS.DET;

    expect(response).toEqual('Detroit Tigers');
  });

  it('returns HOU team name', () => {
    const response = MLB_TEAMS.HOU;

    expect(response).toEqual('Houston Astros');
  });

  it('returns KC team name', () => {
    const response = MLB_TEAMS.KC;

    expect(response).toEqual('Kansas City Royals');
  });

  it('returns LAA team name', () => {
    const response = MLB_TEAMS.LAA;

    expect(response).toEqual('Los Angeles Angels');
  });

  it('returns LAD team name', () => {
    const response = MLB_TEAMS.LAD;

    expect(response).toEqual('Los Angeles Dodgers');
  });

  it('returns MIA team name', () => {
    const response = MLB_TEAMS.MIA;

    expect(response).toEqual('Miami Marlins');
  });

  it('returns MIL team name', () => {
    const response = MLB_TEAMS.MIL;

    expect(response).toEqual('Milwaukee Brewers');
  });

  it('returns MIN team name', () => {
    const response = MLB_TEAMS.MIN;

    expect(response).toEqual('Minnesota Twins');
  });

  it('returns NYM team name', () => {
    const response = MLB_TEAMS.NYM;

    expect(response).toEqual('New York Mets');
  });

  it('returns NYY team name', () => {
    const response = MLB_TEAMS.NYY;

    expect(response).toEqual('New York Yankees');
  });

  it('returns OAK team name', () => {
    const response = MLB_TEAMS.OAK;

    expect(response).toEqual('Oakland Athletics');
  });

  it('returns PHI team name', () => {
    const response = MLB_TEAMS.PHI;

    expect(response).toEqual('Philadelphia Phillies');
  });

  it('returns PIT team name', () => {
    const response = MLB_TEAMS.PIT;

    expect(response).toEqual('Pittsburgh Pirates');
  });

  it('returns SD team name', () => {
    const response = MLB_TEAMS.SD;

    expect(response).toEqual('San Diego Padres');
  });

  it('returns SF team name', () => {
    const response = MLB_TEAMS.SF;

    expect(response).toEqual('San Francisco Giants');
  });

  it('returns SEA team name', () => {
    const response = MLB_TEAMS.SEA;

    expect(response).toEqual('Seattle Mariners');
  });

  it('returns STL team name', () => {
    const response = MLB_TEAMS.STL;

    expect(response).toEqual('St. Louis Cardinals');
  });

  it('returns TB team name', () => {
    const response = MLB_TEAMS.TB;

    expect(response).toEqual('Tampa Bay Rays');
  });

  it('returns TEX team name', () => {
    const response = MLB_TEAMS.TEX;

    expect(response).toEqual('Texas Rangers');
  });

  it('returns TOR team name', () => {
    const response = MLB_TEAMS.TOR;

    expect(response).toEqual('Toronto Blue Jays');
  });

  it('returns WAS team name', () => {
    const response = MLB_TEAMS.WAS;

    expect(response).toEqual('Washington Nationals');
  });
});
