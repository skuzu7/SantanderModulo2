import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import TaskModal from '../TaskModal/TaskModal';
import TaskForm from '../TaskForm/TaskForm';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('There was an error fetching the tasks:', error);
    }
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleUpdateTaskList = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
    fetchTasks(); // Reload tasks after editing
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/task/${id}`);
      fetchTasks(); // Refresh tasks after deletion
    } catch (error) {
      console.error('There was an error deleting the task:', error);
    }
  };

  return (
    <>
      <TaskForm updateTasks={fetchTasks} />
      <div className="table-container bg-gray-700 rounded-lg shadow-md p-4">
        <div className="table-header flex justify-between items-center text-white p-2">
          <div className="header-item w-2/5">Nome</div>
          <div className="header-item w-1/5">Status</div>
          <div className="header-item w-2/5">Ações</div>
        </div>
        <ul className="table-body">
          {tasks.map((task) => (
            <li key={task.id} className="flex justify-between items-center bg-gray-800 p-2 rounded-lg my-1">
              <span className="text-gray-300 w-2/5">{task.name}</span>
              <span className="text-gray-300 w-1/5">{task.checked ? 'Concluído' : 'Pendente'}</span>
              <div className="actions space-x-2 w-2/5 justify-end">
                <button onClick={() => handleEditTask(task)} title="Edit" className="p-2 bg-blue-600 text-white rounded hover:bg-blue-800 transition duration-300">
                  <FaEdit />
                </button>
                <button onClick={() => handleDelete(task.id)} title="Delete" className="p-2 bg-red-600 text-white rounded hover:bg-red-800 transition duration-300">
                  <FaTrashAlt />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {selectedTask && (
        <TaskModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          task={selectedTask}
          onTaskUpdated={handleUpdateTaskList}
        />
      )}
    </>
  );
}

export default TaskList;
