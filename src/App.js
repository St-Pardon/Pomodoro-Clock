import React, { useState, useEffect }  from "react";
import "./style.css";
import "./style.scss";
import Timer from "./components/Timer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function App() {
  const [breakTimer, setBreakTimer] = useState(5);
  const [sessionTimer, setSessionTimer] = useState(25);
  const [timerConverter, setTimerConverter] = useState(1500);
  const [ticking, setTicking] = useState(false);
  const [timeType, setTimeType] = useState('Session');
  const beep = React.useRef();
  const startBeep = new AudioContext();
  
  const reset = () => {
    setBreakTimer(5);
    setSessionTimer(25);
    setTimerConverter(1500);
    setTicking(false);
    setTimeType('Session')
    beep.current.pause();
    beep.current.currentTime = 0;
  }
  const changeBreakTimer = (e) => {
    if(!ticking){
      if (e.currentTarget.value === "add"){
        setBreakTimer(breakTimer !== 60 ? breakTimer+ 1 : breakTimer)
      } else {
        setBreakTimer(breakTimer !== 1 ? breakTimer -1 : breakTimer)
      }
    }
  }
  const changeSessionTimer = (e) => {
    if(!ticking){
      if (e.currentTarget.value === "add"){
        setSessionTimer(sessionTimer !== 60 ? sessionTimer+ 1 : sessionTimer)
        setTimerConverter(timerConverter !== 60*60 ? timerConverter + 60 : timerConverter)
      } else {
        setSessionTimer(sessionTimer !== 1 ? sessionTimer - 1 : sessionTimer)
        setTimerConverter(timerConverter !== 60 ? timerConverter - 60 : timerConverter)
      }
    }
  }
  const displayTimer = () => {
    let minutes = Math.floor(timerConverter / 60); //converts to minutes
    let seconds = timerConverter - minutes * 60; //converts to seconds
    seconds = seconds < 10 ? '0' + seconds : seconds; //ensures seconds appears as 00
    minutes = minutes < 10 ? '0' + minutes : minutes; //ensures minutes appears as 00
    return minutes + ':' + seconds;
  }
  useEffect(() => {
    const changeType = () => {
      if (timeType === 'Session') {
        setTimeType('Break');
        setTimerConverter(breakTimer * 60);
      } else {
        setTimeType('Session');
        setTimerConverter(sessionTimer * 60);
      }
    }
    let interval;
    if (ticking && timerConverter > 0) {
        interval = setInterval(() => {
            setTimerConverter(timerConverter - 1);
        }, 1000);
    } else if (ticking && timerConverter === 0) {
        interval = setInterval(() => {
            setTimerConverter(timerConverter - 1);
        }, 1000);
        beep.current.play();
        changeType();
    } else {
        clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerConverter, timeType, breakTimer, sessionTimer, ticking, beep]);

  const timerStatus = () => {
    if (!ticking){
      startBeep.resume()
      setTicking(true)
    }else{
      setTicking(false)
    }
  }
  
  return (
    <div className="container">
      <h1> 25 + 5 Clock</h1>
      <div className="set-up">
        <Timer 
          increment="break-increment" 
          decrement="break-decrement" 
          timerId="break-label" 
          timerText='Break Length' 
          timer={breakTimer} 
          lengthId="break-length"
          clicked={changeBreakTimer} 
          />
        <Timer 
          increment="session-increment" 
          decrement="session-decrement" 
          timerId="session-label" 
          timerText='Session Length' 
          timer={sessionTimer} 
          lengthId="session-length" 
          clicked={changeSessionTimer} 
          
          />
      </div>
      <div className="display" style={ticking ? timeType == 'Session' ? {borderColor: "#99C24D" }:{borderColor: "#89023E" } : {}}>
        <h3 id="timer-label">{timeType}</h3>
        <h2 id="time-left">{displayTimer()}</h2>
      </div>
      <div className="buttons">
        <button id="start_stop" onClick={timerStatus}>
          <FontAwesomeIcon className="btn" icon={ticking ? "stop":"play"} title={ticking ?"Stop" : "Start"} /> 
        </button>
        <button id="reset" onClick={reset}>
          <FontAwesomeIcon className="btn" icon="undo-alt" title="Reset" /> 
        </button>
      </div>
      <footer style={{marginTop: "60px", textDecorat: "none"}}>
        <a href="https://stackblitz.com/edit/react-rmqx8d?file=src/App.js" >view code</a>
      </footer>
      <audio
          id="beep"
          ref={beep}
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
    </div>
  );
}
