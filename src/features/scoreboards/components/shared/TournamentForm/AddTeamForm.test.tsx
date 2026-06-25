import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AddTeamForm } from './AddTeamForm'
import type { Country } from '@/features/scoreboards/store/countries'

const countries: Country[] = [
  { name: 'Lithuania', countryCode: 'lt' },
  { name: 'Spain', countryCode: 'es' },
]

describe('AddTeamForm', () => {
  it('shows an error when submitting an empty name in text mode', async () => {
    const user = userEvent.setup()
    render(<AddTeamForm buttonLabel="Add" onSubmit={vi.fn()} />)

    await user.type(screen.getByLabelText('Team name'), '   {Enter}')

    expect(await screen.findByText('Name is required.')).toBeInTheDocument()
  })

  it('shows an error when the name already exists', async () => {
    const user = userEvent.setup()
    render(
      <AddTeamForm
        buttonLabel="Add"
        existingNames={['Arsenal']}
        onSubmit={vi.fn()}
      />,
    )

    await user.type(screen.getByLabelText('Team name'), 'arsenal')
    await user.click(screen.getByRole('button', { name: 'Add' }))

    expect(await screen.findByText('That name already exists.')).toBeInTheDocument()
  })

  it('calls onSubmit with the trimmed name in text mode', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<AddTeamForm buttonLabel="Add" onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText('Team name'), '  Arsenal  ')
    await user.click(screen.getByRole('button', { name: 'Add' }))

    expect(onSubmit).toHaveBeenCalledWith('Arsenal')
  })

  it('requires a selection in select mode', async () => {
    const user = userEvent.setup()
    render(
      <AddTeamForm buttonLabel="Add" options={countries} onSubmit={vi.fn()} />,
    )

    const button = screen.getByRole('button', { name: 'Add' })
    expect(button).toBeDisabled()

    await user.selectOptions(screen.getByLabelText('Select option'), 'lt')
    await user.click(button)

    expect(screen.queryByText('Please select an option.')).not.toBeInTheDocument()
  })
})
