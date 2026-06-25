import './ScoreboardTable.scss'
import { columnAlignEnum, scoreboardTableVariantEnum } from './ScoreboardTableEnums'
import { ScoreboardTableRow } from './ScoreboardTableRow'
import type { ScoreboardTableProps, StandingsColumn } from './types'
import { cx } from '@/features/scoreboards/components/shared/utils/cx'

const DEFAULT_COLUMNS: StandingsColumn[] = [
  { key: 'team', label: 'Team', align: columnAlignEnum.START },
  { key: 'playedCount', label: 'P' },
  { key: 'winCount', label: 'W' },
  { key: 'drawCount', label: 'D' },
  { key: 'lossCount', label: 'L' },
  { key: 'totalPoints', label: 'Pts', emphasis: true },
]

export function ScoreboardTable({
  rows = [],
  columns = DEFAULT_COLUMNS,
  variant = scoreboardTableVariantEnum.DEFAULT,
  maxHeight,
}: ScoreboardTableProps) {
  return (
    <div
      className={cx('scoreboard-table', `scoreboard-table--${variant}`)}
      role="table"
      style={{ maxHeight: maxHeight ? `${maxHeight}px` : 'unset' }}
    >
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
      {rows.length === 0 ? (
        <div className="scoreboard-table__empty" role="row">
          <span role="cell">No teams yet.</span>
        </div>
      ) : (
        rows.map((row) => (
          <ScoreboardTableRow key={row.team} row={row} columns={columns} />
        ))
      )}
    </div>
  )
}
