import type { StandingsRow } from '../components/shared/ScoreboardTable/types'
import type { Match, Team } from './types'

const POINTS_WIN = 3
const POINTS_DRAW = 1

export function computeStandings(teams: Team[], matches: Match[]): StandingsRow[] {
  const table = new Map<string, StandingsRow>(
    teams.map((team) => [
      team.id,
      {
        team: team.name,
        countryCode: team.countryCode,
        playedCount: 0,
        winCount: 0,
        drawCount: 0,
        lossCount: 0,
        totalPoints: 0,
      },
    ]),
  )

  for (const match of matches) {
    const home = table.get(match.homeId)
    const away = table.get(match.awayId)
    if (!home || !away) continue

    home.playedCount++
    away.playedCount++

    if (match.homeScore > match.awayScore) {
      home.winCount++
      home.totalPoints += POINTS_WIN
      away.lossCount++
    } else if (match.homeScore < match.awayScore) {
      away.winCount++
      away.totalPoints += POINTS_WIN
      home.lossCount++
    } else {
      home.drawCount++
      away.drawCount++
      home.totalPoints += POINTS_DRAW
      away.totalPoints += POINTS_DRAW
    }
  }

  return [...table.values()].sort(
    (a, b) => b.totalPoints - a.totalPoints || b.winCount - a.winCount,
  )
}
