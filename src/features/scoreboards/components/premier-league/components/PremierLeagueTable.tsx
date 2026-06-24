import './PremierLeagueTable.scss'
import { ScoreboardTable } from '../../shared/ScoreboardTable/ScoreboardTable'
import { columnAlignEnum } from '../../shared/ScoreboardTable/ScoreboardTableEnums'
import type { StandingsColumn } from '../../shared/ScoreboardTable/types'
import { useAppSelector } from '../../../../../app/hooks'
import { selectPremierLeagueStandings } from '../../../store/selectors'

const DEFAULT_COLUMNS: StandingsColumn[] = [
  { key: 'team', label: 'Team', align: columnAlignEnum.START },
  { key: 'playedCount', label: 'P' },
  { key: 'winCount', label: 'W' },
  { key: 'drawCount', label: 'D' },
  { key: 'lossCount', label: 'L' },
  { key: 'totalPoints', label: 'Pts', emphasis: true },
]

export function PremierLeagueTable() {
  const rows = useAppSelector(selectPremierLeagueStandings)

  return (
    <div className="premier-league-table">
      <ScoreboardTable rows={rows} columns={DEFAULT_COLUMNS} />
    </div>
  )
}
