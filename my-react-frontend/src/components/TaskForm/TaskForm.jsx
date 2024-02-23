import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function TaskForm({ updateTasks }) {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:3000/task', data);
      reset(); // Reset the form after submission
      updateTasks(); // Trigger the task list update
    } catch (error) {
      console.error('There was an error adding the task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2 mt-4 mb-4">
      <input
        {...register('name', { required: true })}
        placeholder="Add new task"
        className="flex-1 p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
      >
        Add
      </button>
    </form>
  );
}

export default TaskForm;
