import React from 'react';

interface Task {
  id: number;
  title: string;
  description: string;
}

interface TaskListProps {
  tasks: Task[];
  onUpdateTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onUpdateTask, onDeleteTask }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <span>{task.title}</span>
          <button onClick={() => onUpdateTask(task.id)}>Update</button>
          <button onClick={() => onDeleteTask(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
