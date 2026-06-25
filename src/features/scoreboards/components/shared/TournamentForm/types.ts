import type { Country } from '../../../store/countries'
import type { Match, MatchInput, Team } from '../../../store/types'
import type { tournamentFormVariantEnum } from './TournamentFormEnums'

export interface AddTeamFormProps {
  variant?: tournamentFormVariantEnum
  label?: string
  placeholder?: string
  buttonLabel?: string
  options?: Country[]
  excludeCodes?: string[]
  existingNames?: string[]
  onSubmit: (name: string, countryCode?: string) => void
}

export interface AddScoreFormProps {
  variant?: tournamentFormVariantEnum
  label?: string
  buttonLabel?: string
  teams: Team[]
  matches: Match[]
  onSubmit: (input: MatchInput) => void
}
