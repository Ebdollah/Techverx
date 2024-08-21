import React from "react";
import Workout from "./Workout";
import styles from "./styles.module.css";

const workouts = [
  {
    title: "Pushups",
    description: "Do 30 pushups",
    time: 1000 * 1 * 3,
  },
  {
    title: "Squats",
    description: "Do 30 squats",
    time: 1000 * 1 * 2,
  },
  {
    title: "Pullups",
    description: "Do 10 pullups",
    time: 1000 * 1 * 1,
  },
];

function File() {
  const [completedWorkouts, setCompletedWorkouts] = React.useState([]);

  function handleWorkoutComplete(workoutTitle) {
    setCompletedWorkouts((prevCompletedWorkouts) => [
      ...prevCompletedWorkouts,
      workoutTitle,
    ]);
  }

  return (
    <main>
      <section className={styles.section}>
        <h2>Choose a workout</h2>
        <ul className={styles.ul}>
          {workouts.map((workout) => (
            <li key={workout.title}>
              <Workout
                {...workout}
                onComplete={() => handleWorkoutComplete(workout.title)}
              />
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Completed workouts</h2>
        <ul className={styles.ul}>
          {completedWorkouts.map((workoutTitle, index) => (
            <li key={index}>{workoutTitle}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default File;
