// src/components/DetailTodoCategory.tsx

import React, { useState, useEffect } from 'react';
import { fetchTodoCategoryById, TodoCategory } from '../../api/api';
import Modal from '../reusables/Modal';
import Moment from 'react-moment';

interface DetailTodoCategoryProps {
  token: string;  
  categoryId: string;
  version: string;
  onClose: () => void;
}

const DetailTodoCategory: React.FC<DetailTodoCategoryProps> = ({ token, categoryId, version, onClose }) => {
  const [category, setCategory] = useState<TodoCategory | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      const data = await fetchTodoCategoryById(token, categoryId, version);
      setCategory(data);
    };

    fetchCategory();
  }, [token, categoryId, version]);

  return (
    <Modal onClose={onClose}>
      {category ? (
        <div>
          <h2>Category Details</h2>
          <p>Name: {category.categoryName}</p>
          <p>Sort: {category.categorySort}</p>
          <p>Sync Date: <Moment format="DD/MM/YYYY HH:MM" date={category.syncDt}/></p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </Modal>
  );
};

export default DetailTodoCategory;
