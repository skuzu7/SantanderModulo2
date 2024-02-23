import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root');

function TaskModal({ isOpen, onRequestClose, task, onTaskUpdated }) {
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (task) {
      setValue('name', task.name);
      setValue('checked', task.checked);
    }
  }, [task, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.put(`http://localhost:3000/task/${task.id}`, data);
      if (response.status === 200) {
        onTaskUpdated(); // Função para atualizar a lista de tarefas após a edição
        onRequestClose(); // Fecha o modal
      }
    } catch (error) {
      console.error('There was an error updating the task:', error);
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose} 
      className="task-modal max-w-lg mx-auto bg-white p-6 rounded-lg shadow"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input 
          {...register('name', { required: true })} 
          className="w-full p-2 border border-gray-300 rounded" 
          placeholder="Task Name"
        />
        <label className="flex items-center space-x-2">
          <input 
            type="checkbox" 
            {...register('checked')} 
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span>Completed</span>
        </label>
        <button 
          type="submit" 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Save
        </button>
      </form>
    </Modal>
  );
}

export default TaskModal;
