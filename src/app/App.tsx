import { EurobasketScoreboard } from '../features/scoreboards/components/eurobasket/EurobasketScoreboard'
import { PremierLeagueScoreboard } from '../features/scoreboards/components/premier-league/PremierLeagueScoreboard'
import { WimbledonScoreboard } from '../features/scoreboards/components/wimbledon/WimbledonScoreboard'

function App() {
  return (
    <main className="app-shell">
      <div className="scoreboards__container">
        <PremierLeagueScoreboard />
        <EurobasketScoreboard />
        <WimbledonScoreboard />
      </div>
    </main>
  )
}

export default App
