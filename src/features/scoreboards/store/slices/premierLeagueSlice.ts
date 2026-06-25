import { createTournamentSlice } from './createTournamentSlice'
import { initialPremierLeagueState } from '@/features/scoreboards/store/initialState/initialPremierLeagueState'

const premierLeagueSlice = createTournamentSlice(
  'premierLeague',
  initialPremierLeagueState,
)

export const { teamAdded, matchAdded } = premierLeagueSlice.actions

export default premierLeagueSlice.reducer
