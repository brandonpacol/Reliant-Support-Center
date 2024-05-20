import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import "./BackNavigation.css";

function BackNavigation() {

  const navigate = useNavigate();

  function handleBackPress(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
    navigate("/tickets");
  }

  return (
    <div id="back-navigation">
      <a onClick={handleBackPress}><FontAwesomeIcon id="back-chevron" icon={faChevronLeft} />{"All Tickets"}</a>
    </div>
  )
}

export default BackNavigation;