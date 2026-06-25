export interface Team {
  id: string
  name: string
  countryCode?: string
}

export interface Match {
  id: string
  homeId: string
  awayId: string
  homeScore: number
  awayScore: number
}

export interface TournamentState {
  teams: Team[]
  matches: Match[]
}

export type MatchInput = Omit<Match, 'id'>
