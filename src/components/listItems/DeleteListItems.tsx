import React from 'react';
import { deleteListItems } from '../../api/api';
import buttonStyle from '../../styles/App.module.css'; 

interface DeleteListItemsProps {
  listItemId: string;
  version: string;
  token: string;
  onDelete: () => void;
}

const DeleteListItems: React.FC<DeleteListItemsProps> = ({ listItemId, version, token, onDelete }) => {
  const handleDelete = async () => {
    await deleteListItems(token, listItemId, version);
    onDelete();
  };

  return (
    <div>
      <button className={buttonStyle.button} onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DeleteListItems;
