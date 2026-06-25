import './PremierLeagueBody.scss'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { matchAdded, teamAdded } from '@/features/scoreboards/store/slices/premierLeagueSlice'
import {
  selectPremierLeagueMatches,
  selectPremierLeagueTeams,
} from '@/features/scoreboards/store/selectors'
import { AddTeamForm } from '@/features/scoreboards/components/shared/TournamentForm/AddTeamForm'
import { AddScoreForm } from '@/features/scoreboards/components/shared/TournamentForm/AddScoreForm'
import { tournamentFormVariantEnum } from '@/features/scoreboards/components/shared/TournamentForm/TournamentFormEnums'

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
        existingNames={teams.map((team) => team.name)}
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
