import React from "react";
import styles from "./styles.module.css";

export default function Workout({ title, description, time, onComplete }) {
  const timer = React.useRef();

  function handleStartWorkout() {
    timer.current = setTimeout(() => {
      console.log(title);
      onComplete(title);
    }, time);
  }

  function handleStopWorkout() {
    clearTimeout(timer.current);
    onComplete(title);
  }

  return (
    <article className={styles.article}>
      <h3>{title}</h3>
      <p>{description}</p>
      <p>{time}</p>
      <p>
        <button onClick={handleStartWorkout}>Start</button>
        <button onClick={handleStopWorkout}>Stop</button>
      </p>
    </article>
  );
}
