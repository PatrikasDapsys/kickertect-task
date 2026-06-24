import type { columnAlignEnum } from './ScoreboardTableEnums'

export interface StandingsRow {
  team: string
  playedCount: number
  winCount: number
  drawCount: number
  lossCount: number
  totalPoints: number
}

export type StandingsRowKey = keyof StandingsRow

export interface StandingsColumn {
  key: StandingsRowKey
  label: string
  align?: columnAlignEnum
  emphasis?: boolean
}

export interface ScoreboardTableProps {
  rows?: StandingsRow[]
  columns?: StandingsColumn[]
}

export interface ScoreboardTableRowProps {
  row: StandingsRow
  columns: StandingsColumn[]
}
