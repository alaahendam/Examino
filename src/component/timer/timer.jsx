import React from "react";
import { useTimer } from "react-timer-hook";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import "./timer.css";

function MyTimer({ expiryTimestamp }) {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  return (
    <div>
      <div className="timer">
        <AccessTimeIcon sx={{ fontSize: "32px", marginRight: "7px" }} />
        {hours}:{minutes}:{seconds}
      </div>
      {/*<p>{isRunning ? "Running" : "Not running"}</p>
      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={resume}>Resume</button>
      <button
        onClick={() => {
          // Restarts to 5 minutes timer
          const time = new Date();
          time.setSeconds(time.getSeconds() + 300);
          restart(time);
        }}
      >
        Restart
    </button>*/}
    </div>
  );
}

export default MyTimer;
