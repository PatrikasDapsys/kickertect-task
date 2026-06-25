import type { TournamentState } from '@/features/scoreboards/store/types'

const TEAM_IDS = {
  france: 'eb-team-france',
  lithuania: 'eb-team-lithuania',
  spain: 'eb-team-spain',
  germany: 'eb-team-germany',
} as const

export const initialEurobasketState: TournamentState = {
  teams: [
    { id: TEAM_IDS.france, name: 'France', countryCode: 'fr' },
    { id: TEAM_IDS.lithuania, name: 'Lithuania', countryCode: 'lt' },
    { id: TEAM_IDS.spain, name: 'Spain', countryCode: 'es' },
    { id: TEAM_IDS.germany, name: 'Germany', countryCode: 'de' },
  ],
  matches: [
    { id: 'eb-match-1', homeId: TEAM_IDS.lithuania, awayId: TEAM_IDS.spain, homeScore: 82, awayScore: 77 },
    { id: 'eb-match-2', homeId: TEAM_IDS.france, awayId: TEAM_IDS.germany, homeScore: 71, awayScore: 71 },
  ],
}
