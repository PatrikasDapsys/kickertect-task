import './PremierLeagueBody.scss'
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks'
import { matchAdded, teamAdded } from '../../../store/premierLeagueSlice'
import {
  selectPremierLeagueMatches,
  selectPremierLeagueTeams,
} from '../../../store/selectors'
import { AddTeamForm } from '../../shared/TournamentForm/AddTeamForm'
import { AddScoreForm } from '../../shared/TournamentForm/AddScoreForm'
import { tournamentFormVariantEnum } from '../../shared/TournamentForm/TournamentFormEnums'

export function PremierLeagueBody() {
  const dispatch = useAppDispatch()
  const teams = useAppSelector(selectPremierLeagueTeams)
  const matches = useAppSelector(selectPremierLeagueMatches)

  return (
    <div className="premier-league-body">
      <AddTeamForm
        variant={tournamentFormVariantEnum.PREMIER}
        label="Add Team"
        placeholder="Team name"
        onSubmit={(name) => dispatch(teamAdded(name))}
      />
      <AddScoreForm
        variant={tournamentFormVariantEnum.PREMIER}
        label="Add Score"
        teams={teams}
        matches={matches}
        onSubmit={(input) => dispatch(matchAdded(input))}
      />
    </div>
  )
}
