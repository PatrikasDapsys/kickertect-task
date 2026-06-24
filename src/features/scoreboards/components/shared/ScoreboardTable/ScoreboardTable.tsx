import './ScoreboardTable.scss'
import { columnAlignEnum } from './ScoreboardTableEnums'
import { ScoreboardTableRow } from './ScoreboardTableRow'
import type { ScoreboardTableProps, StandingsColumn, StandingsRow } from './types'
import { cx } from '../utils/cx'

const DEFAULT_COLUMNS: StandingsColumn[] = [
  { key: 'team', label: 'Team', align: columnAlignEnum.START },
  { key: 'playedCount', label: 'P' },
  { key: 'winCount', label: 'W' },
  { key: 'drawCount', label: 'D' },
  { key: 'lossCount', label: 'L' },
  { key: 'totalPoints', label: 'Pts', emphasis: true },
]

const DEFAULT_ROWS: StandingsRow[] = [
  { team: 'Man U', 
    playedCount: 3, 
    winCount: 2, 
    drawCount: 1, 
    lossCount: 0, 
    totalPoints: 7
   },
  { team: 'Liverpool', 
    playedCount: 3, 
    winCount: 2, 
    drawCount: 0, 
    lossCount: 1, 
    totalPoints: 6
   },
  { team: 'Arsenal', 
    playedCount: 3, 
    winCount: 1, 
    drawCount: 2, 
    lossCount: 0, 
    totalPoints: 5
   },
  { team: 'Chelsea', 
    playedCount: 3, 
    winCount: 1, 
    drawCount: 1, 
    lossCount: 1, 
    totalPoints: 4
   },
]

export function ScoreboardTable({
  rows = DEFAULT_ROWS,
  columns = DEFAULT_COLUMNS,
}: ScoreboardTableProps) {

  return (
    <div className="scoreboard-table" role="table">
      <div className="scoreboard-table__row scoreboard-table__row--header" role="row">
        {columns.map((col) => (
          <span
            key={col.label}
            role="columnheader"
            className={cx(
              'scoreboard-table__cell',
              `scoreboard-table__cell--${col.align ?? columnAlignEnum.CENTER}`,
              col.emphasis && 'scoreboard-table__cell--emphasis',
            )}
          >
            {col.label}
          </span>
        ))}
      </div>
      {rows.map((row) => (
        <ScoreboardTableRow
          key={row.team}
          row={row}
          columns={columns}
        />
      ))}
    </div>
  )
}
