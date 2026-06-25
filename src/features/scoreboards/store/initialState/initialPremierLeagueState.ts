import type { TournamentState } from '../types'

const TEAM_IDS = {
  manU: 'pl-team-man-u',
  liverpool: 'pl-team-liverpool',
  arsenal: 'pl-team-arsenal',
  chelsea: 'pl-team-chelsea',
  manCity: 'pl-team-man-city',
  everton: 'pl-team-everton',
} as const

export const initialPremierLeagueState: TournamentState = {
  teams: [
    { id: TEAM_IDS.manU, name: 'Man U' },
    { id: TEAM_IDS.liverpool, name: 'Liverpool' },
    { id: TEAM_IDS.arsenal, name: 'Arsenal' },
    { id: TEAM_IDS.chelsea, name: 'Chelsea' },
    { id: TEAM_IDS.manCity, name: 'Man City' },
    { id: TEAM_IDS.everton, name: 'Everton' },
  ],
  matches: [
    // Man U: vs Arsenal (D), vs Man City (W), vs Everton (W) -> 2W 1D 0L = 7
    { id: 'pl-match-1', homeId: TEAM_IDS.arsenal, awayId: TEAM_IDS.manU, homeScore: 1, awayScore: 1 },
    { id: 'pl-match-2', homeId: TEAM_IDS.manU, awayId: TEAM_IDS.manCity, homeScore: 1, awayScore: 0 },
    { id: 'pl-match-3', homeId: TEAM_IDS.manU, awayId: TEAM_IDS.everton, homeScore: 1, awayScore: 0 },
    // Liverpool: vs Chelsea (W), vs Man City (W), vs Everton (L) -> 2W 0D 1L = 6
    { id: 'pl-match-4', homeId: TEAM_IDS.liverpool, awayId: TEAM_IDS.chelsea, homeScore: 2, awayScore: 1 },
    { id: 'pl-match-5', homeId: TEAM_IDS.liverpool, awayId: TEAM_IDS.manCity, homeScore: 1, awayScore: 0 },
    { id: 'pl-match-6', homeId: TEAM_IDS.liverpool, awayId: TEAM_IDS.everton, homeScore: 0, awayScore: 1 },
    // Arsenal: vs Man U (D), vs Chelsea (D), vs Man City (W) -> 1W 2D 0L = 5
    { id: 'pl-match-7', homeId: TEAM_IDS.arsenal, awayId: TEAM_IDS.chelsea, homeScore: 1, awayScore: 1 },
    { id: 'pl-match-8', homeId: TEAM_IDS.arsenal, awayId: TEAM_IDS.manCity, homeScore: 1, awayScore: 0 },
    // Chelsea: vs Liverpool (L), vs Arsenal (D), vs Everton (W) -> 1W 1D 1L = 4
    { id: 'pl-match-9', homeId: TEAM_IDS.chelsea, awayId: TEAM_IDS.everton, homeScore: 1, awayScore: 0 },
  ],
}
