// import AddTask from "./components/AddTask";

// export default function Home() {
//   return (
//     <main className="max-w-4xl mx-auto mt-4">
//       <div className='text-center my-5 flex flex-col gap-4'>
//         <h1 className='text-2xl font-bold'>Todo List</h1>
//         <AddTask/>
//       </div>
//     </main>
//   )
// }

"use Client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskItem from './components/TaskItem';

const App: React.FC = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/tasks'); // Update the URL accordingly
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []); // Empty dependency array to run the effect only once when the component mounts

  const handleAddTask = async (title: string, description: string) => {
    try {
      const response = await axios.post('/api/tasks', { title, description }); // Update the URL accordingly

      if (response.data) {
        setTasks((prevTasks) => [...prevTasks, response.data]);
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleUpdateTask = async (id: number, updatedTitle: string, updatedDescription: string) => {
    try {
      const response = await axios.put(`/api/tasks/${id}`, { title: updatedTitle, description: updatedDescription }); // Update the URL accordingly

      if (response.data) {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === id ? response.data : task))
        );
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await axios.delete(`/api/tasks/${id}`); // Update the URL accordingly
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div>
      <h1>Task Management App</h1>
      <TaskForm onAddTask={handleAddTask} />
      <TaskList tasks={tasks} onUpdateTask={handleUpdateTask} onDeleteTask={handleDeleteTask} />
    </div>
  );
};

export default App;
 
