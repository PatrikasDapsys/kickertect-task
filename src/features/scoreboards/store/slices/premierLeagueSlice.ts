import { createTournamentSlice } from './createTournamentSlice'
import { initialPremierLeagueState } from '../initialState/initialPremierLeagueState'

const premierLeagueSlice = createTournamentSlice(
  'premierLeague',
  initialPremierLeagueState,
)

export const { teamAdded, matchAdded } = premierLeagueSlice.actions

export default premierLeagueSlice.reducer
