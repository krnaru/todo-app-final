import React, { useState } from 'react';
import { TodoPriority, updateTodoPriorities } from '../../api/api';
import buttonStyle from '../../styles/App.module.css';
import styles from '../styles/form.module.css';

interface UpdateTodoPrioritiesProps {
  priority: TodoPriority;
  onUpdate: (id: string, data: Partial<TodoPriority>) => void;
  version: string;
  token: string;
}

const UpdateTodoCategory: React.FC<UpdateTodoPrioritiesProps> = ({ 
  priority,
  onUpdate,
  version,
  token
 }) => {
  const [priorityName, setpriorityName] = useState(priority.priorityName);
  const [prioritySort, setprioritySort] = useState(priority.prioritySort);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedData: Partial<TodoPriority> = {
      id: priority.id,
      priorityName,
      prioritySort,
      syncDt: priority.syncDt
    };
    try {
      const updatedCategory = await updateTodoPriorities(
        token,
        priority.id,
        version,
        updatedData,
      );
      onUpdate(priority.id, { priorityName, prioritySort });
    }
    catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2 className={styles["form__title"]}>Update Todo Priority</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles["input-group"]}>
          <label>
            Priority name:
            <input
              type="text"
              value={priorityName}
              onChange={(e) => setpriorityName(e.target.value)}
              required
            />
          </label>
        </div>
        <div className={styles["input-group"]}>
          <label>
            Priority sort:
            <input
              className='input-box'
              type="number"
              value={prioritySort}
              onChange={(e) => setprioritySort(e.target.valueAsNumber)}
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
