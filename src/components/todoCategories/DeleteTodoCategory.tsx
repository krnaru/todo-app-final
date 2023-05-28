import React from 'react';
import { deleteTodoCategory } from '../../api/api';
import buttonStyle from '../../styles/App.module.css'; 

interface DeleteTodoCategoryProps {
  categoryId: string;
  version: string;
  token: string;
  onDelete: () => void;
}

const DeleteTodoCategory: React.FC<DeleteTodoCategoryProps> = ({ categoryId, version, token, onDelete }) => {
  const handleDelete = async () => {
    await deleteTodoCategory(token, categoryId, version);
    onDelete();
  };

  return (
    <div>
      <button className={buttonStyle.button} onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DeleteTodoCategory;
