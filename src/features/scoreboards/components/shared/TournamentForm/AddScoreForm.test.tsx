import { describe, expect, it, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AddScoreForm } from './AddScoreForm'
import { match, team } from '@/test/factories'

const teams = [
  team({ id: 'a', name: 'Arsenal' }),
  team({ id: 'b', name: 'Chelsea' }),
]

describe('AddScoreForm', () => {
  it('disables the submit button until all fields are filled', () => {
    render(<AddScoreForm teams={teams} matches={[]} onSubmit={vi.fn()} />)

    expect(screen.getByRole('button', { name: 'Add Score' })).toBeDisabled()
  })

  it('shows an error when scores are not whole numbers', async () => {
    const user = userEvent.setup()
    render(<AddScoreForm teams={teams} matches={[]} onSubmit={vi.fn()} />)

    await user.selectOptions(screen.getByLabelText('Home competitor'), 'a')
    await user.selectOptions(screen.getByLabelText('Away competitor'), 'b')
    await user.type(screen.getByLabelText('Home score'), '1.5')
    await user.type(screen.getByLabelText('Away score'), '0')
    await user.click(screen.getByRole('button', { name: 'Add Score' }))

    expect(
      await screen.findByText('Scores must be whole numbers.'),
    ).toBeInTheDocument()
  })

  it('disables an away option for a team that already played the home team', async () => {
    const user = userEvent.setup()
    const matches = [
      match({ id: 'm1', homeId: 'a', awayId: 'b', homeScore: 1, awayScore: 0 }),
    ]
    render(<AddScoreForm teams={teams} matches={matches} onSubmit={vi.fn()} />)

    await user.selectOptions(screen.getByLabelText('Home competitor'), 'a')

    const awaySelect = screen.getByLabelText('Away competitor')
    expect(
      within(awaySelect).getByRole('option', { name: 'Chelsea' }),
    ).toBeDisabled()
  })

  it('calls onSubmit with parsed integer scores for valid input', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<AddScoreForm teams={teams} matches={[]} onSubmit={onSubmit} />)

    await user.selectOptions(screen.getByLabelText('Home competitor'), 'a')
    await user.selectOptions(screen.getByLabelText('Away competitor'), 'b')
    await user.type(screen.getByLabelText('Home score'), '3')
    await user.type(screen.getByLabelText('Away score'), '1')
    await user.click(screen.getByRole('button', { name: 'Add Score' }))

    expect(onSubmit).toHaveBeenCalledWith({
      homeId: 'a',
      awayId: 'b',
      homeScore: 3,
      awayScore: 1,
    })
  })
})
