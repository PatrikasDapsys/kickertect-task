import type { ScoreboardTableRowProps } from './types'
import { columnAlignEnum } from './ScoreboardTableEnums'
import { cx } from '../utils/cx'

export function ScoreboardTableRow({ row, columns }: ScoreboardTableRowProps) {
  return (
    <div className="scoreboard-table__row" role="row">
      {columns.map((col) => (
        <span
          key={col.key}
          role="cell"
          className={cx(
            'scoreboard-table__cell',
            `scoreboard-table__cell--${col.align ?? columnAlignEnum.CENTER}`,
            col.emphasis && 'scoreboard-table__cell--emphasis',
          )}
        >
          {row[col.key]}
        </span>
      ))}
    </div>
  )
}
