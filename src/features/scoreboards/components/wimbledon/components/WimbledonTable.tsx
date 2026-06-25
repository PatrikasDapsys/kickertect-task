import './WimbledonTable.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { ScoreboardTable } from '@/features/scoreboards/components/shared/ScoreboardTable/ScoreboardTable'
import { columnAlignEnum } from '@/features/scoreboards/components/shared/ScoreboardTable/ScoreboardTableEnums'
import type { StandingsColumn } from '@/features/scoreboards/components/shared/ScoreboardTable/types'
import { useAppSelector } from '@/app/hooks'
import { selectWimbledonStandings } from '@/features/scoreboards/store/selectors'

const WIMBLEDON_COLUMNS: StandingsColumn[] = [
  { key: 'team', label: 'Player', align: columnAlignEnum.START },
  { key: 'playedCount', label: 'M' },
  {
    key: 'winCount',
    label: 'W',
    icon: <FontAwesomeIcon icon={faCheck} className="wimbledon-table__icon--win" />,
  },
  {
    key: 'lossCount',
    label: 'L',
    icon: <FontAwesomeIcon icon={faXmark} className="wimbledon-table__icon--loss" />,
  },
  { key: 'totalPoints', label: 'Pts', emphasis: true },
]

export function WimbledonTable() {
  const rows = useAppSelector(selectWimbledonStandings)

  return (
    <div className="wimbledon-table">
      <ScoreboardTable rows={rows} columns={WIMBLEDON_COLUMNS} maxHeight={240} />
    </div>
  )
}
