import './EurobasketScoreboard.scss'
import { EurobasketHeader } from './components/EurobasketHeader'
import { EurobasketBody } from './components/EurobasketBody'
import { EurobasketTable } from './components/EurobasketTable'

export function EurobasketScoreboard() {
  return (
    <section className="eurobasket-scoreboard">
      <EurobasketHeader />
      <EurobasketBody />
      <EurobasketTable />
    </section>
  )
}
