import React, { useState } from 'react';

interface TaskItemProps {
  task: { id: number; title: string; description: string };
  onUpdateTask: (id: number, title: string, description: string) => void;
  onDeleteTask: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onUpdateTask, onDeleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleUpdateTask = () => {
    
    if (editedTitle.trim() !== '') {
      onUpdateTask(task.id, editedTitle, editedDescription);
      setIsEditing(false);
    }
  };

  return (
    <li>
      {isEditing ? (
        <div>
          <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
          <input type="text" value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} />
          <button onClick={handleUpdateTask}>Save</button>
        </div>
      ) : (
        <div>
          <span>{task.title}</span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDeleteTask(task.id)}>Delete</button>
        </div>
      )}
    </li>
  );
};

export default TaskItem;
