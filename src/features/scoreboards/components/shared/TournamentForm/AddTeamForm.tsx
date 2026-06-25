import './TournamentForm.scss'
import { useId, useState } from 'react'
import { cx } from '@/features/scoreboards/components/shared/utils/cx'
import type { AddTeamFormProps } from './types'
import { tournamentFormVariantEnum } from './TournamentFormEnums'

export function AddTeamForm({
  variant = tournamentFormVariantEnum.PREMIER,
  label,
  placeholder = 'Team name',
  buttonLabel = 'Add',
  options,
  excludeCodes = [],
  existingNames = [],
  onSubmit,
}: AddTeamFormProps) {
  const controlId = useId()
  const [textValue, setTextValue] = useState('')
  const [selectedCode, setSelectedCode] = useState('')
  const [error, setError] = useState('')

  const isSelectMode = Boolean(options)
  const availableOptions = options?.filter(
    (option) => !excludeCodes.includes(option.countryCode),
  )

  const handleSubmit = () => {
    if (isSelectMode) {
      const country = options?.find(
        (option) => option.countryCode === selectedCode,
      )
      if (!country) {
        setError('Please select an option.')
        return
      }
      onSubmit(country.name, country.countryCode)
      setSelectedCode('')
      setError('')
      return
    }

    const name = textValue.trim()
    if (!name) {
      setError('Name is required.')
      return
    }
    const isDuplicate = existingNames.some(
      (existing) => existing.toLowerCase() === name.toLowerCase(),
    )
    if (isDuplicate) {
      setError('That name already exists.')
      return
    }

    onSubmit(name)
    setTextValue('')
    setError('')
  }

  const isSubmitDisabled = isSelectMode ? !selectedCode : !textValue.trim()

  return (
    <div className={cx('tournament-form', `tournament-form--${variant}`)}>
      {label && (
        <label className="tournament-form__label" htmlFor={controlId}>
          {label}
        </label>
      )}
      <div className="tournament-form__row">
        {isSelectMode ? (
          <select
            id={controlId}
            className="tournament-form__control"
            aria-label={label ? undefined : 'Select option'}
            value={selectedCode}
            onChange={(event) => {
              setSelectedCode(event.target.value)
              setError('')
            }}
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
            id={controlId}
            type="text"
            className="tournament-form__control"
            aria-label={label ? undefined : placeholder}
            placeholder={placeholder}
            value={textValue}
            onChange={(event) => {
              setTextValue(event.target.value)
              setError('')
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') handleSubmit()
            }}
          />
        )}
        <button
          type="button"
          className="tournament-form__button"
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
        >
          {buttonLabel}
        </button>
      </div>
      {error && (
        <p className="tournament-form__error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
