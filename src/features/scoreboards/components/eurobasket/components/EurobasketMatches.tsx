import './EurobasketMatches.scss'
import type { Match, Team } from '../../../store/types'

interface EurobasketMatchesProps {
  matches: Match[]
  teams: Team[]
}

export function EurobasketMatches({ matches, teams }: EurobasketMatchesProps) {
  const teamsById = new Map(teams.map((team) => [team.id, team]))

  return (
    <div className="eurobasket-matches__container">
      <div className="eurobasket-matches">
        {matches.length === 0 && (
          <div className="eurobasket-matches__empty">No matches yet.</div>
        )}
        {matches.map((match) => {
          const home = teamsById.get(match.homeId)
          const away = teamsById.get(match.awayId)
          if (!home || !away) return null
          return (
            <div className="eurobasket-matches__match" key={match.id}>
              <div className="eurobasket-matches__teams">
                <span className="eurobasket-matches__team">
                  {home.countryCode && (
                    <span
                      className={`fi fi-${home.countryCode} eurobasket-matches__flag`}
                      aria-hidden="true"
                    />
                  )}
                  {home.name}
                </span>
                <span className="eurobasket-matches__teams-separator">vs</span>
                <span className="eurobasket-matches__team">
                  {away.countryCode && (
                    <span
                      className={`fi fi-${away.countryCode} eurobasket-matches__flag`}
                      aria-hidden="true"
                    />
                  )}
                  {away.name}
                </span>
              </div>
              <div className="eurobasket-matches__score">
                {match.homeScore}-{match.awayScore}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
