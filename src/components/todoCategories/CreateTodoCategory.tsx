import React, { useState } from 'react';
import { createTodoCategory, TodoCategory} from '../../api/api';
import styles from '../styles/form.module.css';

interface CreateTodoCategoryProps {
  version: string;
  token: string;
  onCreate: (category: TodoCategory) => void;
}

const CreateTodoCategory: React.FC<CreateTodoCategoryProps> = ({ version, token, onCreate }) => {
  const [categoryName, setCategoryName] = useState('');
  const [categorySort, setCategorySort] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!categoryName || !categorySort) {
      setError('All fields are required.');
      return;
    }

    try {
      const newCategory: Partial<TodoCategory> = {
        categoryName,
        categorySort: Number(categorySort),
      };

      const createdCategory = await createTodoCategory(token, version, newCategory);
      onCreate(createdCategory);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Create Todo Category</h2>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles["input-group"]}>
        <label htmlFor="categoryName">Category Name:</label>
        <input
          type="text"
          id="categoryName"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
      </div>
      <div className={styles["input-group"]}>
        <label htmlFor="categorySort">Category Sort:</label>
        <input
          type="number"
          id="categorySort"
          value={categorySort}
          onChange={(e) => setCategorySort(e.target.value)}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateTodoCategory;
