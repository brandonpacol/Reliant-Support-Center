import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { Status } from "../types/Ticket";
import "./StatusTag.css"

interface StatusTagProps {
  status: string;
  style?: React.CSSProperties;
  editable?: boolean;
}

function StatusTag({ status, style, editable = false }: StatusTagProps) {

  let statusColor = "transparent";
  let statusFontcolor = undefined;
  switch (status) {
    case Status.Open:
      statusColor = "#a9cffc";
      statusFontcolor = "#506175";
      break;
    case Status.InProgress:
      statusColor = "#fcf4a9";
      statusFontcolor = "#998e28";
      break;
    case "closed":
    case Status.Resolved:
      statusColor = "#a9fcb0";
      statusFontcolor = "#3d6940";
      break;
    default:
      break;
  }

  return (
    <span className="status-tag" style={{ backgroundColor: statusColor, color: statusFontcolor, ...style }}>
      {status}
      {editable && <FontAwesomeIcon icon={faCaretDown} style={{marginLeft: "0.5em"}}/>}
    </span>
  )
}

export default StatusTag;