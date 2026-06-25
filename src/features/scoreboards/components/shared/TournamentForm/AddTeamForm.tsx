import './TournamentForm.scss'
import { useState } from 'react'
import { cx } from '../utils/cx'
import type { AddTeamFormProps } from './types'
import { tournamentFormVariantEnum } from './TournamentFormEnums'

export function AddTeamForm({
  variant = tournamentFormVariantEnum.PREMIER,
  label,
  placeholder = 'Team name',
  buttonLabel = 'Add',
  options,
  excludeCodes = [],
  onSubmit,
}: AddTeamFormProps) {
  const [textValue, setTextValue] = useState('')
  const [selectedCode, setSelectedCode] = useState('')

  const isSelectMode = Boolean(options)
  const availableOptions = options?.filter(
    (option) => !excludeCodes.includes(option.countryCode),
  )

  const handleSubmit = () => {
    if (isSelectMode) {
      const country = options?.find(
        (option) => option.countryCode === selectedCode,
      )
      if (!country) return
      onSubmit(country.name, country.countryCode)
      setSelectedCode('')
      return
    }

    const name = textValue.trim()
    if (!name) return
    onSubmit(name)
    setTextValue('')
  }

  return (
    <div className={cx('tournament-form', `tournament-form--${variant}`)}>
      {label && <label className="tournament-form__label">{label}</label>}
      <div className="tournament-form__row">
        {isSelectMode ? (
          <select
            className="tournament-form__control"
            value={selectedCode}
            onChange={(event) => setSelectedCode(event.target.value)}
          >
            <option value="">Select country</option>
            {availableOptions?.map((option) => (
              <option key={option.countryCode} value={option.countryCode}>
                {option.name}
              </option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            className="tournament-form__control"
            placeholder={placeholder}
            value={textValue}
            onChange={(event) => setTextValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') handleSubmit()
            }}
          />
        )}
        <button
          type="button"
          className="tournament-form__button"
          onClick={handleSubmit}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  )
}
