import { useState, useEffect, useRef, ChangeEvent } from "react";
import StatusTag from "./StatusTag";
import { Status } from "../types/Ticket";
import "./StatusTag.css";

const StatusArray = Object.values(Status);

interface StatusTagEditableProps {
  status: string;
  updateTicket: (status: string) => void;
  style?: React.CSSProperties;
}

function StatusTagEditable({ status, updateTicket, style }: StatusTagEditableProps) {

  const [showDropdown, setShowDropdown] = useState(false);
  const [originalStatus, setOriginalStatus] = useState(status);
  const [currStatus, setCurrStatus] = useState(status);
  const dropdownRef = useRef<HTMLDivElement>(null);

  function handleStatusClick() {
    setCurrStatus(originalStatus);
    setShowDropdown(!showDropdown);
  }

  function handleUpdateClick() {
    setShowDropdown(!showDropdown);
    updateTicket(currStatus);
  }

  function handleClickOutside(event: MouseEvent) {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setShowDropdown(false);
      setCurrStatus(originalStatus);
    }
  }

  function handleChangeStatus(event: ChangeEvent<HTMLInputElement>) {
    setCurrStatus(event.target.value);
  }

  useEffect(() => {
    setOriginalStatus(status);
  }, [status]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>

      <div className="editable-status" onClick={handleStatusClick}>
        <StatusTag status={status} style={style} editable={true} />
      </div>

      <div ref={dropdownRef} className="status-tag-dropdown" style={{ display: showDropdown ? "flex" : "none" }}>
        {StatusArray.map((value) => {
          return (
            <div className="radio-option">
              <input id={`${value}-radio`} type="radio" value={value} name="status" onChange={handleChangeStatus} checked={value === currStatus} />
              <label htmlFor={`${value}-radio`}>{value}</label>
            </div>
          )
        })}
        <button className="update-btn" onClick={handleUpdateClick}>Update</button>
      </div>
    </div>
  )
}

export default StatusTagEditable;