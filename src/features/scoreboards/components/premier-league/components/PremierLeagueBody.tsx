import './PremierLeagueBody.scss'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks'
import {
  matchAdded,
  teamAdded,
} from '../../../store/premierLeagueSlice'
import {
  selectPremierLeagueMatches,
  selectPremierLeagueTeams,
} from '../../../store/selectors'

export function PremierLeagueBody() {
  const dispatch = useAppDispatch()
  const teams = useAppSelector(selectPremierLeagueTeams)
  const matches = useAppSelector(selectPremierLeagueMatches)

  const [teamName, setTeamName] = useState('')
  const [homeId, setHomeId] = useState('')
  const [awayId, setAwayId] = useState('')
  const [homeScore, setHomeScore] = useState('')
  const [awayScore, setAwayScore] = useState('')

  const hasPlayed = (a: string, b: string) =>
    matches.some(
      (match) =>
        (match.homeId === a && match.awayId === b) ||
        (match.homeId === b && match.awayId === a),
    )

  const handleAddTeam = () => {
    const name = teamName.trim()
    if (!name) return
    dispatch(teamAdded(name))
    setTeamName('')
  }

  const handleAddScore = () => {
    if (!homeId || !awayId || homeId === awayId) return
    if (homeScore === '' || awayScore === '') return
    const home = Number(homeScore)
    const away = Number(awayScore)
    if (!Number.isFinite(home) || !Number.isFinite(away)) return
    if (home < 0 || away < 0) return
    if (hasPlayed(homeId, awayId)) return

    dispatch(
      matchAdded({ homeId, awayId, homeScore: home, awayScore: away }),
    )
    setHomeId('')
    setAwayId('')
    setHomeScore('')
    setAwayScore('')
  }

  return (
    <div className="premier-league-body">
      <div className="premier-league-body__team-section">
        <label htmlFor="team-name">Add Team</label>
        <div className="premier-league-body__team-input">
          <input
            type="text"
            id="team-name"
            placeholder="Team name"
            value={teamName}
            onChange={(event) => setTeamName(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') handleAddTeam()
            }}
          />
          <button type="button" id="add-team-button" onClick={handleAddTeam}>
            Add
          </button>
        </div>
      </div>
      <div className="premier-league-body__score-section">
        <label htmlFor="score-input">Add Score</label>
        <div className="premier-league-body__score-input">
          <div className="premier-league-body__score-team">
            <select
              name="home-team"
              id="home-team"
              value={homeId}
              onChange={(event) => setHomeId(event.target.value)}
            >
              <option value="">Home Team</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
            <input
              min="0"
              max="999"
              type="number"
              placeholder="Home Score"
              value={homeScore}
              onChange={(event) => setHomeScore(event.target.value)}
            />
          </div>
          <div className="premier-league-body__score-team">
            <select
              name="away-team"
              id="away-team"
              value={awayId}
              onChange={(event) => setAwayId(event.target.value)}
            >
              <option value="">Away Team</option>
              {teams.map((team) => (
                <option
                  key={team.id}
                  value={team.id}
                  disabled={
                    team.id === homeId ||
                    (homeId !== '' && hasPlayed(homeId, team.id))
                  }
                >
                  {team.name}
                </option>
              ))}
            </select>
            <input
              min="0"
              max="999"
              type="number"
              placeholder="Away Score"
              value={awayScore}
              onChange={(event) => setAwayScore(event.target.value)}
            />
          </div>
        </div>
        <button type="button" id="add-score-button" onClick={handleAddScore}>
          Add Score
        </button>
      </div>
    </div>
  )
}
