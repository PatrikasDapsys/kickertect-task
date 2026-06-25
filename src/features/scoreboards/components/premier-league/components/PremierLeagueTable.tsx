import './PremierLeagueTable.scss'
import { ScoreboardTable } from '@/features/scoreboards/components/shared/ScoreboardTable/ScoreboardTable'
import { useAppSelector } from '@/app/hooks'
import { selectPremierLeagueStandings } from '@/features/scoreboards/store/selectors'

export function PremierLeagueTable() {
  const rows = useAppSelector(selectPremierLeagueStandings)

  return (
    <div className="premier-league-table">
      <ScoreboardTable rows={rows} maxHeight={200} />
    </div>
  )
}
