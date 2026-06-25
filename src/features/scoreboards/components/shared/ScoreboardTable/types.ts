import type { ReactNode } from 'react'
import type {
  columnAlignEnum,
  scoreboardTableVariantEnum,
} from './ScoreboardTableEnums'

export interface StandingsRow {
  team: string
  countryCode?: string
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
  icon?: ReactNode
}

export interface ScoreboardTableProps {
  rows?: StandingsRow[]
  columns?: StandingsColumn[]
  variant?: scoreboardTableVariantEnum
  maxHeight?: number,
}

export interface ScoreboardTableRowProps {
  row: StandingsRow
  columns: StandingsColumn[]
}
