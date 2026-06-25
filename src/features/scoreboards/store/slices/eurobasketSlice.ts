import { createTournamentSlice } from './createTournamentSlice'
import { initialEurobasketState } from '@/features/scoreboards/store/initialState/initialEurobasketState'

const eurobasketSlice = createTournamentSlice('eurobasket', initialEurobasketState)

export const { teamAdded, matchAdded } = eurobasketSlice.actions

export default eurobasketSlice.reducer
