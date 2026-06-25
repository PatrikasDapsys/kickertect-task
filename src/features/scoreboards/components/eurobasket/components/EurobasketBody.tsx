import './EurobasketBody.scss'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { matchAdded, teamAdded } from '@/features/scoreboards/store/slices/eurobasketSlice'
import {
  selectEurobasketMatches,
  selectEurobasketTeams,
} from '@/features/scoreboards/store/selectors'
import { EUROBASKET_COUNTRIES } from '@/features/scoreboards/store/countries'
import { AddTeamForm } from '@/features/scoreboards/components/shared/TournamentForm/AddTeamForm'
import { AddScoreForm } from '@/features/scoreboards/components/shared/TournamentForm/AddScoreForm'
import { tournamentFormVariantEnum } from '@/features/scoreboards/components/shared/TournamentForm/TournamentFormEnums'
import { eurobasketFormEnum } from './EurobasketEnums'
import { EurobasketMatches } from './EurobasketMatches'

export function EurobasketBody() {
  const dispatch = useAppDispatch()
  const teams = useAppSelector(selectEurobasketTeams)
  const matches = useAppSelector(selectEurobasketMatches)

  const [openForm, setOpenForm] = useState<eurobasketFormEnum | null>(null)

  const usedCodes = teams
    .map((team) => team.countryCode)
    .filter((code): code is string => Boolean(code))

  const toggle = (form: eurobasketFormEnum) =>
    setOpenForm((current) => (current === form ? null : form))

  return (
    <div className="eurobasket-body">
      <div className="eurobasket-body__actions">
        <button
          className="eurobasket-body__actions-button"
          type="button"
          id="add-team-button"
          aria-expanded={openForm === eurobasketFormEnum.TEAM}
          onClick={() => toggle(eurobasketFormEnum.TEAM)}
        >
          <FontAwesomeIcon icon={faPlus} /> Add Team
        </button>
        <button
          className="eurobasket-body__actions-button"
          type="button"
          id="add-score-button"
          aria-expanded={openForm === eurobasketFormEnum.SCORE}
          onClick={() => toggle(eurobasketFormEnum.SCORE)}
        >
          <FontAwesomeIcon icon={faPlus} /> Add Score
        </button>
      </div>

      {openForm === eurobasketFormEnum.TEAM && (
        <div className="eurobasket-body__form">
          <AddTeamForm
            variant={tournamentFormVariantEnum.EUROBASKET}
            buttonLabel="Add"
            options={EUROBASKET_COUNTRIES}
            excludeCodes={usedCodes}
            onSubmit={(name, countryCode) => {
              dispatch(teamAdded({ name, countryCode }))
              setOpenForm(null)
            }}
          />
        </div>
      )}

      {openForm === eurobasketFormEnum.SCORE && (
        <div className="eurobasket-body__form">
          <AddScoreForm
            variant={tournamentFormVariantEnum.EUROBASKET}
            teams={teams}
            matches={matches}
            onSubmit={(input) => {
              dispatch(matchAdded(input))
              setOpenForm(null)
            }}
          />
        </div>
      )}

      <EurobasketMatches matches={matches} teams={teams} />
    </div>
  )
}
