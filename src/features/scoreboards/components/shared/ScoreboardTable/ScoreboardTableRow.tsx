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
          {col.key === 'team' && row.countryCode && (
            <span
              className={`fi fi-${row.countryCode} scoreboard-table__flag`}
              aria-hidden="true"
            />
          )}
          {row[col.key]}
          {col.icon && (
            <span className="scoreboard-table__cell-adornment" aria-hidden="true">
              {col.icon}
            </span>
          )}
        </span>
      ))}
    </div>
  )
}
