import './EurobasketHeader.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBasketball } from '@fortawesome/free-solid-svg-icons'

export function EurobasketHeader() {
  return (
    <header className="eurobasket-header">
      <h2 className="eurobasket-header__title">
        <FontAwesomeIcon icon={faBasketball} />
        Eurobasket
      </h2>
    </header>
  )
}
