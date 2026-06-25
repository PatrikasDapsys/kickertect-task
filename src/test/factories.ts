import type { Match, Team } from '@/features/scoreboards/store/types'

export function team(overrides: Partial<Team> = {}): Team {
  return {
    id: 'team-1',
    name: 'Arsenal',
    countryCode: 'gb-eng',
    ...overrides,
  }
}

export function match(overrides: Partial<Match> = {}): Match {
  return {
    id: 'match-1',
    homeId: 'team-1',
    awayId: 'team-2',
    homeScore: 2,
    awayScore: 1,
    ...overrides,
  }
}
