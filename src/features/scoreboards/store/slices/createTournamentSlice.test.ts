import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createTournamentSlice } from './createTournamentSlice'
import type { TournamentState } from '@/features/scoreboards/store/types'

function makeSlice(initialState: TournamentState = { teams: [], matches: [] }) {
  const slice = createTournamentSlice('test', initialState)
  return { reducer: slice.reducer, ...slice.actions }
}

describe('createTournamentSlice', () => {
  let uuidCounter = 0

  beforeEach(() => {
    uuidCounter = 0
    vi.stubGlobal('crypto', {
      randomUUID: () => `id-${++uuidCounter}`,
    })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  describe('teamAdded', () => {
    it('adds a team and trims the name', () => {
      const { reducer, teamAdded } = makeSlice()

      const state = reducer(undefined, teamAdded('  Arsenal  '))

      expect(state.teams).toEqual([
        { id: 'id-1', name: 'Arsenal', countryCode: undefined },
      ])
    })

    it('ignores empty or whitespace-only names', () => {
      const { reducer, teamAdded } = makeSlice()

      const state = reducer(undefined, teamAdded('   '))

      expect(state.teams).toHaveLength(0)
    })

    it('rejects duplicate names case-insensitively', () => {
      const { reducer, teamAdded } = makeSlice({
        teams: [{ id: 'a', name: 'Arsenal' }],
        matches: [],
      })

      const state = reducer(undefined, teamAdded('arsenal'))

      expect(state.teams).toHaveLength(1)
    })

    it('stores the country code when provided', () => {
      const { reducer, teamAdded } = makeSlice()

      const state = reducer(
        undefined,
        teamAdded({ name: 'Lithuania', countryCode: 'lt' }),
      )

      expect(state.teams[0]).toMatchObject({
        name: 'Lithuania',
        countryCode: 'lt',
      })
    })
  })

  describe('matchAdded', () => {
    const baseState: TournamentState = {
      teams: [
        { id: 'a', name: 'Arsenal' },
        { id: 'b', name: 'Chelsea' },
      ],
      matches: [],
    }

    it('adds a valid match', () => {
      const { reducer, matchAdded } = makeSlice(baseState)

      const state = reducer(
        undefined,
        matchAdded({ homeId: 'a', awayId: 'b', homeScore: 2, awayScore: 1 }),
      )

      expect(state.matches).toEqual([
        { id: 'id-1', homeId: 'a', awayId: 'b', homeScore: 2, awayScore: 1 },
      ])
    })

    it('rejects a match where a team plays itself', () => {
      const { reducer, matchAdded } = makeSlice(baseState)

      const state = reducer(
        undefined,
        matchAdded({ homeId: 'a', awayId: 'a', homeScore: 1, awayScore: 0 }),
      )

      expect(state.matches).toHaveLength(0)
    })

    it('rejects negative scores', () => {
      const { reducer, matchAdded } = makeSlice(baseState)

      const state = reducer(
        undefined,
        matchAdded({ homeId: 'a', awayId: 'b', homeScore: -1, awayScore: 0 }),
      )

      expect(state.matches).toHaveLength(0)
    })

    it('rejects non-finite scores', () => {
      const { reducer, matchAdded } = makeSlice(baseState)

      const state = reducer(
        undefined,
        matchAdded({
          homeId: 'a',
          awayId: 'b',
          homeScore: Number.NaN,
          awayScore: 0,
        }),
      )

      expect(state.matches).toHaveLength(0)
    })

    it('rejects a match referencing a non-existent team', () => {
      const { reducer, matchAdded } = makeSlice(baseState)

      const state = reducer(
        undefined,
        matchAdded({ homeId: 'a', awayId: 'ghost', homeScore: 1, awayScore: 0 }),
      )

      expect(state.matches).toHaveLength(0)
    })

    it('rejects a duplicate fixture regardless of home/away order', () => {
      const { reducer, matchAdded } = makeSlice({
        teams: baseState.teams,
        matches: [
          { id: 'm1', homeId: 'a', awayId: 'b', homeScore: 1, awayScore: 0 },
        ],
      })

      const state = reducer(
        undefined,
        matchAdded({ homeId: 'b', awayId: 'a', homeScore: 2, awayScore: 2 }),
      )

      expect(state.matches).toHaveLength(1)
    })
  })
})
