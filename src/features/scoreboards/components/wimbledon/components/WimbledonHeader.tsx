import './WimbledonHeader.scss'
import tennisBallIcon from '../assets/tennis-ball.svg'

export function WimbledonHeader() {
  return (
    <header className="wimbledon-header">
      <h2 className="wimbledon-header__title">
        <img src={tennisBallIcon} alt="" className="wimbledon-header__icon" />
        Wimbledon
      </h2>
    </header>
  )
}
