import './WimbledonBody.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export function WimbledonBody() {
  return (
    <div className="wimbledon-body">
      <div className="wimbledon-body__actions">
        <button className="wimbledon-body__actions-button" type="button" id="add-team-button">
          <FontAwesomeIcon icon={faPlus} /> Add Player
        </button>
        <button
          className="wimbledon-body__actions-button wimbledon-body__actions-button--secondary"
          type="button"
          id="add-score-button"
        >
          <FontAwesomeIcon icon={faPlus} /> Add Score
        </button>
      </div>
    </div>
  )
}
