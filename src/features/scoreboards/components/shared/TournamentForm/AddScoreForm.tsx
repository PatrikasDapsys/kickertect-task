import './TournamentForm.scss'
import { useId, useState } from 'react'
import { cx } from '@/features/scoreboards/components/shared/utils/cx'
import type { AddScoreFormProps } from './types'
import { tournamentFormVariantEnum } from './TournamentFormEnums'

export function AddScoreForm({
  variant = tournamentFormVariantEnum.PREMIER,
  label,
  buttonLabel = 'Add Score',
  teams,
  matches,
  onSubmit,
}: AddScoreFormProps) {
  const labelId = useId()
  const [homeId, setHomeId] = useState('')
  const [awayId, setAwayId] = useState('')
  const [homeScore, setHomeScore] = useState('')
  const [awayScore, setAwayScore] = useState('')
  const [error, setError] = useState('')

  const hasPlayed = (a: string, b: string) =>
    matches.some(
      (match) =>
        (match.homeId === a && match.awayId === b) ||
        (match.homeId === b && match.awayId === a),
    )

  const handleSubmit = () => {
    if (!homeId || !awayId) {
      setError('Select both competitors.')
      return
    }
    if (homeId === awayId) {
      setError('A competitor cannot play itself.')
      return
    }
    if (homeScore === '' || awayScore === '') {
      setError('Enter both scores.')
      return
    }
    const home = Number(homeScore)
    const away = Number(awayScore)
    if (!Number.isInteger(home) || !Number.isInteger(away)) {
      setError('Scores must be whole numbers.')
      return
    }
    if (home < 0 || away < 0) {
      setError('Scores cannot be negative.')
      return
    }
    if (hasPlayed(homeId, awayId)) {
      setError('These two have already played.')
      return
    }

    onSubmit({ homeId, awayId, homeScore: home, awayScore: away })
    setHomeId('')
    setAwayId('')
    setHomeScore('')
    setAwayScore('')
    setError('')
  }

  const isSubmitDisabled =
    !homeId || !awayId || homeScore === '' || awayScore === ''

  return (
    <div
      className={cx('tournament-form', `tournament-form--${variant}`)}
      role="group"
      aria-labelledby={label ? labelId : undefined}
    >
      {label && (
        <span className="tournament-form__label" id={labelId}>
          {label}
        </span>
      )}
      <div className="tournament-form__score-row">
        <div className="tournament-form__score-team">
          <select
            className="tournament-form__control"
            name="home-team"
            aria-label="Home competitor"
            value={homeId}
            onChange={(event) => {
              setHomeId(event.target.value)
              setError('')
            }}
          >
            <option value="">Home Team</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
          <input
            min="0"
            max="999"
            type="number"
            className="tournament-form__control"
            aria-label="Home score"
            placeholder="Home Score"
            value={homeScore}
            onChange={(event) => {
              setHomeScore(event.target.value)
              setError('')
            }}
          />
        </div>
        <div className="tournament-form__score-team">
          <select
            className="tournament-form__control"
            name="away-team"
            aria-label="Away competitor"
            value={awayId}
            onChange={(event) => {
              setAwayId(event.target.value)
              setError('')
            }}
          >
            <option value="">Away Team</option>
            {teams.map((team) => (
              <option
                key={team.id}
                value={team.id}
                disabled={
                  team.id === homeId ||
                  (homeId !== '' && hasPlayed(homeId, team.id))
                }
              >
                {team.name}
              </option>
            ))}
          </select>
          <input
            min="0"
            max="999"
            type="number"
            className="tournament-form__control"
            aria-label="Away score"
            placeholder="Away Score"
            value={awayScore}
            onChange={(event) => {
              setAwayScore(event.target.value)
              setError('')
            }}
          />
        </div>
      </div>
      <button
        type="button"
        className="tournament-form__button tournament-form__button--block"
        onClick={handleSubmit}
        disabled={isSubmitDisabled}
      >
        {buttonLabel}
      </button>
      {error && (
        <p className="tournament-form__error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
