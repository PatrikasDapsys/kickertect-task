import { createTournamentSlice } from './createTournamentSlice'
import { initialEurobasketState } from './initialEurobasketState'

const eurobasketSlice = createTournamentSlice('eurobasket', initialEurobasketState)

export const { teamAdded, matchAdded, matchRemoved, teamRemoved } =
  eurobasketSlice.actions

export default eurobasketSlice.reducer
