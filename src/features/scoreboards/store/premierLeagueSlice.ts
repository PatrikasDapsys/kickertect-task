import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { MatchInput, TournamentState } from './types'

const initialState: TournamentState = {
  teams: [],
  matches: [],
}

const premierLeagueSlice = createSlice({
  name: 'premierLeague',
  initialState,
  reducers: {
    teamAdded: {
      reducer: (state, action: PayloadAction<{ id: string; name: string }>) => {
        const name = action.payload.name.trim()
        if (!name) return
        const exists = state.teams.some(
          (team) => team.name.toLowerCase() === name.toLowerCase(),
        )
        if (exists) return
        state.teams.push({ id: action.payload.id, name })
      },
      prepare: (name: string) => ({
        payload: { id: crypto.randomUUID(), name },
      }),
    },
    matchAdded: {
      reducer: (state, action: PayloadAction<{ id: string } & MatchInput>) => {
        const { id, homeId, awayId, homeScore, awayScore } = action.payload

        if (homeId === awayId) return
        if (!Number.isFinite(homeScore) || !Number.isFinite(awayScore)) return
        if (homeScore < 0 || awayScore < 0) return

        const bothExist =
          state.teams.some((team) => team.id === homeId) &&
          state.teams.some((team) => team.id === awayId)
        if (!bothExist) return

        const alreadyPlayed = state.matches.some(
          (match) =>
            (match.homeId === homeId && match.awayId === awayId) ||
            (match.homeId === awayId && match.awayId === homeId),
        )
        if (alreadyPlayed) return

        state.matches.push({ id, homeId, awayId, homeScore, awayScore })
      },
      prepare: (input: MatchInput) => ({
        payload: { id: crypto.randomUUID(), ...input },
      }),
    },
    matchRemoved: (state, action: PayloadAction<string>) => {
      state.matches = state.matches.filter((match) => match.id !== action.payload)
    },
    teamRemoved: (state, action: PayloadAction<string>) => {
      const teamId = action.payload
      state.teams = state.teams.filter((team) => team.id !== teamId)
      state.matches = state.matches.filter(
        (match) => match.homeId !== teamId && match.awayId !== teamId,
      )
    },
  },
})

export const { teamAdded, matchAdded, matchRemoved, teamRemoved } =
  premierLeagueSlice.actions

export default premierLeagueSlice.reducer
