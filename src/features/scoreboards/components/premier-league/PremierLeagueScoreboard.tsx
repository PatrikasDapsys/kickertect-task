import './PremierLeagueScoreboard.scss'
import { PremierLeagueHeader } from './components/PremierLeagueHeader'
import { PremierLeagueBody } from './components/PremierLeagueBody'
import { PremierLeagueTable } from './components/PremierLeagueTable'

export function PremierLeagueScoreboard() {
  return (
    <section className="premier-scoreboard">
      <PremierLeagueHeader />
      <PremierLeagueBody />
      <PremierLeagueTable />
    </section>
  )
}
