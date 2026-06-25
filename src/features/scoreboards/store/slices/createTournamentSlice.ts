import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Match, MatchInput, Team, TournamentState } from '../types'

export interface TeamInput {
  name: Team['name']
  countryCode?: Team['countryCode']
}

export function createTournamentSlice(
  name: string,
  initialState: TournamentState,
) {
  return createSlice({
    name,
    initialState,
    reducers: {
      teamAdded: {
        reducer: (state, action: PayloadAction<Team>) => {
          const teamName = action.payload.name.trim()
          if (!teamName) return
          const exists = state.teams.some(
            (team) => team.name.toLowerCase() === teamName.toLowerCase(),
          )
          if (exists) return
          state.teams.push({
            id: action.payload.id,
            name: teamName,
            countryCode: action.payload.countryCode,
          })
        },
        prepare: (input: TeamInput | Team['name']) => {
          const { name, countryCode } =
            typeof input === 'string' ? { name: input, countryCode: undefined } : input
          return {
            payload: { id: crypto.randomUUID(), name, countryCode },
          }
        },
      },
      matchAdded: {
        reducer: (state, action: PayloadAction<Match>) => {
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
    },
  })
}
