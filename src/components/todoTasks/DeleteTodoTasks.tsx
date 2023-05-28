import React from 'react';
import { deleteTodoCategory, deleteTodoTasks } from '../../api/api';
import buttonStyle from '../../styles/App.module.css'; 

interface DeleteTodoTasksProps {
  taskId: string;
  version: string;
  token: string;
  onDelete: () => void;
}

const DeleteTodoTask: React.FC<DeleteTodoTasksProps> = ({ taskId, version, token, onDelete }) => {
  const handleDelete = async () => {
    await deleteTodoTasks(token, taskId, version);
    onDelete();
  };

  return (
    <div>
      <button className={buttonStyle.button} onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DeleteTodoTask;
