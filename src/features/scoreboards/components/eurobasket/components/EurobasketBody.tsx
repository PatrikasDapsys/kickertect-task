import './EurobasketBody.scss'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks'
import { matchAdded, teamAdded } from '../../../store/eurobasketSlice'
import {
  selectEurobasketMatches,
  selectEurobasketTeams,
} from '../../../store/selectors'
import { EUROBASKET_COUNTRIES } from '../../../store/countries'
import { AddTeamForm } from '../../shared/TournamentForm/AddTeamForm'
import { AddScoreForm } from '../../shared/TournamentForm/AddScoreForm'
import { tournamentFormVariantEnum } from '../../shared/TournamentForm/TournamentFormEnums'
import { eurobasketFormEnum } from './eurobasketEnums'

export function EurobasketBody() {
  const dispatch = useAppDispatch()
  const teams = useAppSelector(selectEurobasketTeams)
  const matches = useAppSelector(selectEurobasketMatches)

  const [openForm, setOpenForm] = useState<eurobasketFormEnum | null>(null)

  const teamsById = new Map(teams.map((team) => [team.id, team]))
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

      <div className="eurobasket-body__matches">
        {matches.length === 0 && (
          <div className="eurobasket-body__empty">No matches yet.</div>
        )}
        {matches.map((match) => {
          const home = teamsById.get(match.homeId)
          const away = teamsById.get(match.awayId)
          if (!home || !away) return null
          return (
            <div className="eurobasket-body__match" key={match.id}>
              <div className="eurobasket-body__match-teams">
                <span className="eurobasket-body__match-team">
                  {home.countryCode && (
                    <span
                      className={`fi fi-${home.countryCode} eurobasket-body__match-flag`}
                      aria-hidden="true"
                    />
                  )}
                  {home.name}
                </span>
                <span className="eurobasket-body__match-teams-separator">vs</span>
                <span className="eurobasket-body__match-team">
                  {away.countryCode && (
                    <span
                      className={`fi fi-${away.countryCode} eurobasket-body__match-flag`}
                      aria-hidden="true"
                    />
                  )}
                  {away.name}
                </span>
              </div>
              <div className="eurobasket-body__match-score">
                {match.homeScore}-{match.awayScore}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
