import { createTournamentSlice } from './createTournamentSlice'
import { initialWimbledonState } from './initialWimbledonState'

const wimbledonSlice = createTournamentSlice('wimbledon', initialWimbledonState)

export const { teamAdded, matchAdded, matchRemoved, teamRemoved } =
  wimbledonSlice.actions

export default wimbledonSlice.reducer
