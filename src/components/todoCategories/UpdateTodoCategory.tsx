import React, { useState } from 'react';
import { TodoCategory, updateTodoCategory } from '../../api/api';
import buttonStyle from '../../styles/App.module.css'; 
import styles from '../styles/form.module.css';

interface UpdateTodoCategoryProps {
  category: TodoCategory;
  onUpdate: (id: string, data: Partial<TodoCategory>) => void;
  version: string;
  token: string;
}

const UpdateTodoCategory: React.FC<UpdateTodoCategoryProps> = ({ 
  category,
  onUpdate,
  version,
  token
 }) => {
  const [categoryName, setCategoryName] = useState(category.categoryName);
  const [categorySort, setCategorySort] = useState(category.categorySort);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedData: Partial<TodoCategory> = {
      id: category.id,
      categoryName,
      categorySort,
      syncDt: category.syncDt
    };
    try {
      const updatedCategory = await updateTodoCategory(
        token,
        category.id,
        version,
        updatedData,
      );
      onUpdate(category.id, { categoryName, categorySort });
    }
    catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2 className={styles["form__title"]}>Update todo category</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles["input-group"]}>
          <label>
            Category name:
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
          </label>
        </div>
        <div className={styles["input-group"]}>
          <label>
            Category sort:
            <input
              className='input-box'
              type="number"
              value={categorySort}
              onChange={(e) => setCategorySort(e.target.valueAsNumber)}
              required
            />
          </label>
        </div>
        <button className={`${styles.button} ${buttonStyle.button}`} type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateTodoCategory;
