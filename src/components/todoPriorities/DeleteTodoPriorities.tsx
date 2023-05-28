import React from 'react';
import { deleteTodoPriorities } from '../../api/api';
import buttonStyle from '../../styles/App.module.css'; 

interface DeleteTodoPriortiesProps {
  priorityId: string;
  version: string;
  token: string;
  onDelete: () => void;
}

const DeleteTodoPriority: React.FC<DeleteTodoPriortiesProps> = ({ priorityId, version, token, onDelete }) => {
  const handleDelete = async () => {
    await deleteTodoPriorities(token, priorityId, version);
    onDelete();
  };

  return (
    <div>
      <button className={buttonStyle.button} onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DeleteTodoPriority;
