import './WimbledonBody.scss'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks'
import { matchAdded, teamAdded } from '../../../store/slices/wimbledonSlice'
import {
  selectWimbledonMatches,
  selectWimbledonTeams,
} from '../../../store/selectors'
import { AddTeamForm } from '../../shared/TournamentForm/AddTeamForm'
import { AddScoreForm } from '../../shared/TournamentForm/AddScoreForm'
import { tournamentFormVariantEnum } from '../../shared/TournamentForm/TournamentFormEnums'
import { wimbledonFormEnum } from './WimbledonEnums'

export function WimbledonBody() {
  const dispatch = useAppDispatch()
  const teams = useAppSelector(selectWimbledonTeams)
  const matches = useAppSelector(selectWimbledonMatches)

  const [openForm, setOpenForm] = useState<wimbledonFormEnum | null>(null)

  const toggle = (form: wimbledonFormEnum) =>
    setOpenForm((current) => (current === form ? null : form))

  return (
    <div className="wimbledon-body">
      <div className="wimbledon-body__actions">
        <button
          className="wimbledon-body__actions-button"
          type="button"
          id="add-team-button"
          aria-expanded={openForm === wimbledonFormEnum.PLAYER}
          onClick={() => toggle(wimbledonFormEnum.PLAYER)}
        >
          <FontAwesomeIcon icon={faPlus} /> Add Player
        </button>
        <button
          className="wimbledon-body__actions-button wimbledon-body__actions-button--secondary"
          type="button"
          id="add-score-button"
          aria-expanded={openForm === wimbledonFormEnum.SCORE}
          onClick={() => toggle(wimbledonFormEnum.SCORE)}
        >
          <FontAwesomeIcon icon={faPlus} /> Add Score
        </button>
      </div>

      {openForm === wimbledonFormEnum.PLAYER && (
        <div className="wimbledon-body__form">
          <AddTeamForm
            variant={tournamentFormVariantEnum.WIMBLEDON}
            placeholder="Player name"
            buttonLabel="Add"
            onSubmit={(name) => {
              dispatch(teamAdded(name))
              setOpenForm(null)
            }}
          />
        </div>
      )}

      {openForm === wimbledonFormEnum.SCORE && (
        <div className="wimbledon-body__form">
          <AddScoreForm
            variant={tournamentFormVariantEnum.WIMBLEDON}
            teams={teams}
            matches={matches}
            onSubmit={(input) => {
              dispatch(matchAdded(input))
              setOpenForm(null)
            }}
          />
        </div>
      )}
    </div>
  )
}
