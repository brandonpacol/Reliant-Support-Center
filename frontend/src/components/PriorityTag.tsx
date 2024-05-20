import React from "react";
import { Priority } from "../types/Ticket";
import { getPriorityName } from "../helpers/utils";
import "./PriorityTag.css"

interface PriorityTag {
  priority: number;
  style?: React.CSSProperties;
}

/** The Priority Tag component to display showing the priority of the ticket (ex. High, Medium, Low). */
function PriorityTag({ priority, style }: PriorityTag) {

  const priorityStr = getPriorityName(priority) || "N/A";

  let priorityColor = "transparent";
  let priorityFontColor = undefined;
  switch (priority) {
    case Priority.High:
      priorityColor = "#ff8282";
      priorityFontColor = "#a33636";
      break;
    case Priority.Medium:
      priorityColor = "#ffa382";
      priorityFontColor = "#873e23";
      break;
    case Priority.Low:
      priorityColor = "#cfcfcf";
      priorityFontColor = "#454545";
      break;
    default:
      break;
  }

  return (
    <span className="priority-tag" style={{ backgroundColor: priorityColor, color: priorityFontColor, ...style }}>{priorityStr}</span>
  )
}

export default PriorityTag;