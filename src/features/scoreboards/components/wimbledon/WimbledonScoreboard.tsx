import './WimbledonScoreboard.scss'
import { WimbledonHeader } from './components/WimbledonHeader'
import { WimbledonBody } from './components/WimbledonBody'
import { WimbledonTable } from './components/WimbledonTable'

export function WimbledonScoreboard() {
  return (
    <section className="wimbledon-scoreboard">
      <WimbledonHeader />
      <WimbledonBody />
      <WimbledonTable />
    </section>
  )
}
