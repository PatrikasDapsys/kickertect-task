import { describe, expect, it } from 'vitest'
import { computeStandings } from './computeStandings'
import { match, team } from '@/test/factories'

describe('computeStandings', () => {
  it('returns an empty array when there are no teams', () => {
    expect(computeStandings([], [])).toEqual([])
  })

  it('returns all-zero rows for teams without matches', () => {
    const teams = [
      team({ id: 'a', name: 'Arsenal' }),
      team({ id: 'b', name: 'Chelsea' }),
    ]

    const standings = computeStandings(teams, [])

    expect(standings).toHaveLength(2)
    for (const row of standings) {
      expect(row).toMatchObject({
        playedCount: 0,
        winCount: 0,
        drawCount: 0,
        lossCount: 0,
        totalPoints: 0,
      })
    }
  })

  it('awards 3 points and a win to the home winner and a loss to the away team', () => {
    const teams = [
      team({ id: 'a', name: 'Arsenal' }),
      team({ id: 'b', name: 'Chelsea' }),
    ]
    const matches = [
      match({ homeId: 'a', awayId: 'b', homeScore: 2, awayScore: 1 }),
    ]

    const [winner, loser] = computeStandings(teams, matches)

    expect(winner).toMatchObject({
      team: 'Arsenal',
      playedCount: 1,
      winCount: 1,
      lossCount: 0,
      totalPoints: 3,
    })
    expect(loser).toMatchObject({
      team: 'Chelsea',
      playedCount: 1,
      winCount: 0,
      lossCount: 1,
      totalPoints: 0,
    })
  })

  it('awards 1 point to each team for a draw', () => {
    const teams = [
      team({ id: 'a', name: 'Arsenal' }),
      team({ id: 'b', name: 'Chelsea' }),
    ]
    const matches = [
      match({ homeId: 'a', awayId: 'b', homeScore: 1, awayScore: 1 }),
    ]

    const standings = computeStandings(teams, matches)

    for (const row of standings) {
      expect(row).toMatchObject({
        drawCount: 1,
        winCount: 0,
        lossCount: 0,
        totalPoints: 1,
      })
    }
  })

  it('sorts teams by total points descending', () => {
    const teams = [
      team({ id: 'a', name: 'Arsenal' }),
      team({ id: 'b', name: 'Chelsea' }),
      team({ id: 'c', name: 'Liverpool' }),
    ]
    const matches = [
      match({ id: 'm1', homeId: 'a', awayId: 'b', homeScore: 2, awayScore: 0 }),
      match({ id: 'm2', homeId: 'a', awayId: 'c', homeScore: 2, awayScore: 0 }),
      match({ id: 'm3', homeId: 'b', awayId: 'c', homeScore: 1, awayScore: 0 }),
    ]

    const standings = computeStandings(teams, matches)

    expect(standings.map((row) => row.team)).toEqual([
      'Arsenal',
      'Chelsea',
      'Liverpool',
    ])
  })

  it('breaks ties on equal points by win count', () => {
    const teams = [
      team({ id: 'w', name: 'OneWin' }),
      team({ id: 'd', name: 'ThreeDraws' }),
      team({ id: 'x', name: 'X' }),
      team({ id: 'y', name: 'Y' }),
      team({ id: 'z', name: 'Z' }),
    ]
    const matches = [
      match({ id: 'm1', homeId: 'w', awayId: 'x', homeScore: 1, awayScore: 0 }),
      match({ id: 'm2', homeId: 'd', awayId: 'x', homeScore: 0, awayScore: 0 }),
      match({ id: 'm3', homeId: 'd', awayId: 'y', homeScore: 0, awayScore: 0 }),
      match({ id: 'm4', homeId: 'd', awayId: 'z', homeScore: 0, awayScore: 0 }),
    ]

    const standings = computeStandings(teams, matches)

    const [first, second] = standings
    expect(first).toMatchObject({ team: 'OneWin', totalPoints: 3, winCount: 1 })
    expect(second).toMatchObject({
      team: 'ThreeDraws',
      totalPoints: 3,
      winCount: 0,
    })
  })

  it('skips matches that reference unknown team ids', () => {
    const teams = [team({ id: 'a', name: 'Arsenal' })]
    const matches = [
      match({ homeId: 'a', awayId: 'ghost', homeScore: 1, awayScore: 0 }),
    ]

    const standings = computeStandings(teams, matches)

    expect(standings).toHaveLength(1)
    expect(standings[0]).toMatchObject({
      team: 'Arsenal',
      playedCount: 0,
      totalPoints: 0,
    })
  })
})
