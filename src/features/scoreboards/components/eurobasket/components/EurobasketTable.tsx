import './EurobasketTable.scss'
import { ScoreboardTable } from '../../shared/ScoreboardTable/ScoreboardTable'
import {
  columnAlignEnum,
  scoreboardTableVariantEnum,
} from '../../shared/ScoreboardTable/ScoreboardTableEnums'
import type { StandingsColumn } from '../../shared/ScoreboardTable/types'
import { useAppSelector } from '../../../../../app/hooks'
import { selectEurobasketStandings } from '../../../store/selectors'

const EUROBASKET_COLUMNS: StandingsColumn[] = [
  { key: 'team', label: 'Team', align: columnAlignEnum.START },
  { key: 'winCount', label: 'W' },
  { key: 'lossCount', label: 'L' },
  { key: 'drawCount', label: 'D' },
  { key: 'totalPoints', label: 'Pts', emphasis: true },
]

export function EurobasketTable() {
  const rows = useAppSelector(selectEurobasketStandings)

  return (
    <div className="eurobasket-table">
      <div className="eurobasket-table__heading">Score Table:</div>
      <ScoreboardTable
        rows={rows}
        columns={EUROBASKET_COLUMNS}
        variant={scoreboardTableVariantEnum.EUROBASKET}
      />
    </div>
  )
}
