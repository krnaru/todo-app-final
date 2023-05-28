// src/components/DetailTodoCategory.tsx

import React, { useState, useEffect } from 'react';
import { fetchListItemsById, fetchTodoCategoryById, ListItem, TodoCategory } from '../../api/api';
import Modal from '../reusables/Modal';

interface DetailListItemsProps {
  token: string;  
  listItemId: string;
  version: string;
  onClose: () => void;
}

const DetailListItems: React.FC<DetailListItemsProps> = ({ token, listItemId, version, onClose }) => {
  const [listItem, setListItem] = useState<ListItem | null>(null);

  useEffect(() => {
    const fetchListItem = async () => {
      const data = await fetchListItemsById(token, listItemId, version);
      setListItem(data);
    };

    fetchListItem();
  }, [token, listItemId, version]);

  return (
    <Modal onClose={onClose}>
      {listItem ? (
        <div>
          <h2>Category Details</h2>
          <p>ID: {listItem.id}</p>
          <p>Description: {listItem.description}</p>
          <p>Completed: {listItem.completed ? '✔️' : '❌'}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </Modal>
  );
};

export default DetailListItems;
