import { combineReducers, configureStore } from '@reduxjs/toolkit'
import premierLeagueReducer from '@/features/scoreboards/store/slices/premierLeagueSlice'
import eurobasketReducer from '@/features/scoreboards/store/slices/eurobasketSlice'
import wimbledonReducer from '@/features/scoreboards/store/slices/wimbledonSlice'

const rootReducer = combineReducers({
  premierLeague: premierLeagueReducer,
  eurobasket: eurobasketReducer,
  wimbledon: wimbledonReducer,
})

export type TestState = ReturnType<typeof rootReducer>

export function createTestStore(preloadedState?: Partial<TestState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState as TestState | undefined,
  })
}

export type TestStore = ReturnType<typeof createTestStore>
