import React,{useRef, useState} from 'react'
import ResultModal from './ResultModal';

function TimerChallenge({title, targetTime}) {
    const timer = useRef();
    const dialog = useRef();

    const [timeExpired, setTimeExpired] = useState(false);
    const [timerStarted, setTimerStarted] = useState(false);
    const handleStart = ()=>{
        timer.current = setTimeout(() => {
            setTimeExpired(true);
            dialog.current.open();
            // setTimerStarted(false);
        }, targetTime * 1000);
        setTimerStarted(true);
    }
    const handleStop =()=>{
        clearTimeout(timer.current);
        // setTimerStarted(false);
    }
  return (
    <>
   <ResultModal ref={dialog} targetTime={targetTime} result='Lost'/>
    <section className='challenge'>
        <h2>{title}</h2>
        <p className='challenge-time'>{targetTime} seconds</p>
        <p><button onClick={timerStarted ? handleStop : handleStart}>
           {timerStarted ? 'Stop' : 'Start '} challenge
        </button></p>
        <p className={timerStarted ? 'active' : undefined}>{timerStarted ? 'Timer is running' : 'Timer inactive'} </p>
    </section>
    </>
  )
}

export default TimerChallenge