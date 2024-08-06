import React,{useRef, useState} from 'react'

function TimerChallenge({title, targetTime}) {
    const timer = useRef();

    const [timeExpired, setTimeExpired] = useState(false);
    const [timerStarted, setTimerStarted] = useState(false);
    const handleStart = ()=>{
        timer.current = setTimeout(() => {
            setTimeExpired(true);
            // setTimerStarted(false);
        }, targetTime * 1000);
        setTimerStarted(true);
    }
    const handleStop =()=>{
        clearTimeout(timer.current);
        setTimerStarted(false);
    }
  return (
    <section className='challenge'>
        <h2>{title}</h2>
        {timeExpired && <p>You Lost</p>}
        <p className='challenge-time'>{targetTime} seconds</p>
        <p><button onClick={timerStarted ? handleStop : handleStart}>
           {timerStarted ? 'stop' : 'start '} challenge
        </button></p>
        <p className={timerStarted ? 'active' : undefined}>{timerStarted && 'Timer is running'}{ timeExpired && 'Timer is inactive'} </p>
    </section>
  )
}

export default TimerChallenge