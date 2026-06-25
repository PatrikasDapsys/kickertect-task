import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ScoreboardTable } from './ScoreboardTable'
import type { StandingsRow } from './types'

describe('ScoreboardTable', () => {
  it('renders the empty state when there are no rows', () => {
    render(<ScoreboardTable rows={[]} />)

    expect(screen.getByText('No teams yet.')).toBeInTheDocument()
  })

  it('renders a row for each team with its points', () => {
    const rows: StandingsRow[] = [
      {
        team: 'Arsenal',
        playedCount: 3,
        winCount: 3,
        drawCount: 0,
        lossCount: 0,
        totalPoints: 9,
      },
    ]

    render(<ScoreboardTable rows={rows} />)

    expect(screen.getByText('Arsenal')).toBeInTheDocument()
    expect(screen.getByText('9')).toBeInTheDocument()
  })
})
