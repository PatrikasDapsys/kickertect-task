import './TournamentForm.scss'
import { useState } from 'react'
import { cx } from '../utils/cx'
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
  const [homeId, setHomeId] = useState('')
  const [awayId, setAwayId] = useState('')
  const [homeScore, setHomeScore] = useState('')
  const [awayScore, setAwayScore] = useState('')

  const hasPlayed = (a: string, b: string) =>
    matches.some(
      (match) =>
        (match.homeId === a && match.awayId === b) ||
        (match.homeId === b && match.awayId === a),
    )

  const handleSubmit = () => {
    if (!homeId || !awayId || homeId === awayId) return
    if (homeScore === '' || awayScore === '') return
    const home = Number(homeScore)
    const away = Number(awayScore)
    if (!Number.isFinite(home) || !Number.isFinite(away)) return
    if (home < 0 || away < 0) return
    if (hasPlayed(homeId, awayId)) return

    onSubmit({ homeId, awayId, homeScore: home, awayScore: away })
    setHomeId('')
    setAwayId('')
    setHomeScore('')
    setAwayScore('')
  }

  return (
    <div className={cx('tournament-form', `tournament-form--${variant}`)}>
      {label && <label className="tournament-form__label">{label}</label>}
      <div className="tournament-form__score-row">
        <div className="tournament-form__score-team">
          <select
            className="tournament-form__control"
            name="home-team"
            value={homeId}
            onChange={(event) => setHomeId(event.target.value)}
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
            placeholder="Home Score"
            value={homeScore}
            onChange={(event) => setHomeScore(event.target.value)}
          />
        </div>
        <div className="tournament-form__score-team">
          <select
            className="tournament-form__control"
            name="away-team"
            value={awayId}
            onChange={(event) => setAwayId(event.target.value)}
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
            placeholder="Away Score"
            value={awayScore}
            onChange={(event) => setAwayScore(event.target.value)}
          />
        </div>
      </div>
      <button
        type="button"
        className="tournament-form__button tournament-form__button--block"
        onClick={handleSubmit}
      >
        {buttonLabel}
      </button>
    </div>
  )
}
