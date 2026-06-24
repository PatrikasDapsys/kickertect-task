import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '../../../app/store'
import { computeStandings } from './computeStandings'

const selectPremierLeagueTeams = (state: RootState) => state.premierLeague.teams
const selectPremierLeagueMatches = (state: RootState) =>
  state.premierLeague.matches

export const selectPremierLeagueStandings = createSelector(
  [selectPremierLeagueTeams, selectPremierLeagueMatches],
  (teams, matches) => computeStandings(teams, matches),
)

export { selectPremierLeagueTeams, selectPremierLeagueMatches }
