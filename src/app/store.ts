import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  persistReducer,
  persistStore,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'
import { createLocalStorage } from './storage'
import premierLeagueReducer from '@/features/scoreboards/store/slices/premierLeagueSlice'
import eurobasketReducer from '@/features/scoreboards/store/slices/eurobasketSlice'
import wimbledonReducer from '@/features/scoreboards/store/slices/wimbledonSlice'

const storage = createLocalStorage()

const rootReducer = combineReducers({
  premierLeague: premierLeagueReducer,
  eurobasket: eurobasketReducer,
  wimbledon: wimbledonReducer,
})

const persistConfig = {
  key: 'scoreboards',
  version: 3,
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
