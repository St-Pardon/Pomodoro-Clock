import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Timer = ({ timer, timerId, timerText, decrement, increment, lengthId, clicked }) => {
  return(
    <div className="length-control">
      <h2 id={timerId}>{timerText}</h2>
      <div >
        <button className="btn" onClick={clicked} id={decrement}  value="sub" >
          <FontAwesomeIcon className="fonts" icon="caret-left" title="decrease"  />
        </button>
        <h3 id={lengthId}>{timer}</h3>
        <button className="btn" onClick={clicked} id={increment} value="add" >
          <FontAwesomeIcon className="fonts" icon="caret-right" title="increase" />
        </button>
      </div>
    </div>
  )
}

export default Timer