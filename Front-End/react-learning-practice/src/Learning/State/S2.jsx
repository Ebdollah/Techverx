import { useState } from 'react';

export default function S2() {
  // Initialize state with a list of tasks
  const [tasks, setTasks] = useState([
    { id: 0, task: 'Buy groceries', completed: false },
    { id: 1, task: 'Walk the dog', completed: false },
    { id: 2, task: 'Read a book', completed: true },
  ]);

  // Handle toggle of task completion
  function handleToggle(taskId, nextCompleted) {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, completed: nextCompleted }
          : task
      )
    );
  }

  return (
    <div>
      <h1>Task List</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <label>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={e => handleToggle(task.id, e.target.checked)}
              />
              {task.task}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
