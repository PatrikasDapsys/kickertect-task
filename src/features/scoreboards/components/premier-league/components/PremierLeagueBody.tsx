import './PremierLeagueBody.scss'

export function PremierLeagueBody() {
  return (
    <div className="premier-league-body">
      <div className="premier-league-body__team-section">
        <label htmlFor="team-name">Add Team</label>
        <div className="premier-league-body__team-input">
          <input type="text" id="team-name" placeholder="Team name" />
          <button type="button" id="add-team-button">Add</button>
        </div>
      </div>
      <div className="premier-league-body__score-section">
        <label htmlFor="score-input">Add Score</label>
        <div className="premier-league-body__score-input">
          <div className="premier-league-body__score-team">
            <select name="home-team" id="home-team">
              <option value="">Home Team</option>
            </select>
            <input min="0" max="999" type="number" placeholder="Home Score" />
          </div>
          <div className="premier-league-body__score-team">
            <select name="away-team" id="away-team">
              <option value="">Away Team</option>
            </select>
            <input min="0" max="999" type="number" placeholder="Away Score" />
          </div>
        </div>
        <button type="button" id="add-score-button">Add Score</button>
      </div>
    </div>
  )
}
