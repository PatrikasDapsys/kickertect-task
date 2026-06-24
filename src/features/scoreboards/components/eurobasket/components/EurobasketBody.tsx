import './EurobasketBody.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export function EurobasketBody() {
  return (
    <div className="eurobasket-body">
      <div className="eurobasket-body__actions">
        <button className="eurobasket-body__actions-button" type="button" id="add-team-button">
          <FontAwesomeIcon icon={faPlus} /> Add Team
        </button>
        <button className="eurobasket-body__actions-button" type="button" id="add-score-button">
          <FontAwesomeIcon icon={faPlus} /> Add Score
        </button>
      </div>
      <div className="eurobasket-body__matches">
        <div className="eurobasket-body__match">
          <div className="eurobasket-body__match-teams">
            <span className="eurobasket-body__match-team">
              <span className="fi fi-lt eurobasket-body__match-flag" aria-hidden="true" />
              Lithuania
            </span>
            <span className="eurobasket-body__match-teams-separator">vs</span>
            <span className="eurobasket-body__match-team">
              <span className="fi fi-es eurobasket-body__match-flag" aria-hidden="true" />
              Spain
            </span>
          </div>
          <div className="eurobasket-body__match-score">100-90</div>
        </div>
        <div className="eurobasket-body__match">
          <div className="eurobasket-body__match-teams">
            <span className="eurobasket-body__match-team">
              <span className="fi fi-lt eurobasket-body__match-flag" aria-hidden="true" />
              Lithuania
            </span>
            <span className="eurobasket-body__match-teams-separator">vs</span>
            <span className="eurobasket-body__match-team">
              <span className="fi fi-es eurobasket-body__match-flag" aria-hidden="true" />
              Spain
            </span>
          </div>
          <div className="eurobasket-body__match-score">100-90</div>
        </div>
      </div>
    </div>
  )
}
