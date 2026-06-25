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

const selectEurobasketTeams = (state: RootState) => state.eurobasket.teams
const selectEurobasketMatches = (state: RootState) => state.eurobasket.matches

export const selectEurobasketStandings = createSelector(
  [selectEurobasketTeams, selectEurobasketMatches],
  (teams, matches) => computeStandings(teams, matches),
)

export {
  selectPremierLeagueTeams,
  selectPremierLeagueMatches,
  selectEurobasketTeams,
  selectEurobasketMatches,
}
