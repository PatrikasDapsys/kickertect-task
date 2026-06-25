import type { TournamentState } from './types'

const TEAM_IDS = {
  lithuania: 'eb-team-lithuania',
  spain: 'eb-team-spain',
  france: 'eb-team-france',
  germany: 'eb-team-germany',
  serbia: 'eb-team-serbia',
  greece: 'eb-team-greece',
} as const

export const initialEurobasketState: TournamentState = {
  teams: [
    { id: TEAM_IDS.lithuania, name: 'Lithuania', countryCode: 'lt' },
    { id: TEAM_IDS.spain, name: 'Spain', countryCode: 'es' },
    { id: TEAM_IDS.france, name: 'France', countryCode: 'fr' },
    { id: TEAM_IDS.germany, name: 'Germany', countryCode: 'de' },
    { id: TEAM_IDS.serbia, name: 'Serbia', countryCode: 'rs' },
    { id: TEAM_IDS.greece, name: 'Greece', countryCode: 'gr' },
  ],
  matches: [
    { id: 'eb-match-1', homeId: TEAM_IDS.lithuania, awayId: TEAM_IDS.spain, homeScore: 82, awayScore: 77 },
    { id: 'eb-match-2', homeId: TEAM_IDS.france, awayId: TEAM_IDS.germany, homeScore: 71, awayScore: 71 },
    { id: 'eb-match-3', homeId: TEAM_IDS.serbia, awayId: TEAM_IDS.greece, homeScore: 90, awayScore: 84 },
    { id: 'eb-match-4', homeId: TEAM_IDS.lithuania, awayId: TEAM_IDS.france, homeScore: 88, awayScore: 79 },
    { id: 'eb-match-5', homeId: TEAM_IDS.serbia, awayId: TEAM_IDS.spain, homeScore: 95, awayScore: 91 },
  ],
}
