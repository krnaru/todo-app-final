import React from 'react';
import { TodoCategory } from '../../api/api';

interface ReadTodoCategoryProps {
  category: TodoCategory;
}

const ReadTodoCategory: React.FC<ReadTodoCategoryProps> = ({ category }) => {
  return (
    <div>
      <h3>Todo Category Details</h3>
      <ul>
        <li><b>Category Name:</b> {category.categoryName}</li>
        <li><b>Category Sort:</b> {category.categorySort}</li>
      </ul>
    </div>
  );
};

export default ReadTodoCategory;
