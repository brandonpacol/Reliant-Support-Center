import { useState, useEffect, useRef, ChangeEvent } from "react";
import StatusTag from "./StatusTag";
import { Status } from "../types/Ticket";

const StatusArray = Object.values(Status);

interface StatusTagEditableProps {
  status: string;
  updateTicket: (status: string) => void;
  style?: React.CSSProperties;
}

function StatusTagEditable({ status, updateTicket, style }: StatusTagEditableProps) {

  const [showDropdown, setShowDropdown] = useState(false);
  const [currStatus, setCurrStatus] = useState(status);
  const dropdownRef = useRef<HTMLDivElement>(null);

  function handleStatusClick() {
    setShowDropdown(!showDropdown);
  }

  function handleUpdateClick() {
    setShowDropdown(!showDropdown);
    updateTicket(currStatus);
  }

  function handleClickOutside(event: MouseEvent) {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setShowDropdown(false);
    }
  }

  function handleChangeStatus(event: ChangeEvent<HTMLInputElement>) {
    setCurrStatus(event.target.value);
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>

      <div onClick={handleStatusClick}>
        <StatusTag status={status} style={style} editable={true} />
      </div>

      <div ref={dropdownRef} style={{ display: showDropdown ? "flex" : "none", flexDirection: "column", position: "absolute", backgroundColor: "white", marginTop: "0.8em", padding: "0.5em", borderRadius: "0.5em", boxShadow: "0px 2px 10px rgba(0,0,0,0.1)" }}>
        {StatusArray.map((value) => {
          return (
            <div style={{marginBottom: "0.5em"}}>
              <input id={`${value}-radio`} type="radio" value={value} name="status" onChange={handleChangeStatus}/>
              <label htmlFor={`${value}-radio`}>{value}</label>
            </div>
          )
        })}
        <button style={{padding: "0.5em", borderRadius: "0.5em"}} onClick={handleUpdateClick}>Update</button>
      </div>
    </div>
  )
}

export default StatusTagEditable;