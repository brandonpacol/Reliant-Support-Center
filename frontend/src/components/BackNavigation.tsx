import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import "./BackNavigation.css";

function BackNavigation() {
  return (
    <div id="back-navigation">
      <a href="/tickets"><FontAwesomeIcon id="back-chevron" icon={faChevronLeft} />{"All Tickets"}</a>
    </div>
  )
}

export default BackNavigation;