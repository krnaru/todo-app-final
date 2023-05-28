import React, { useState } from 'react';
import { createTodoPriorities, TodoPriority} from '../../api/api';
import styles from '../styles/form.module.css';

interface CreateTodoPrioritiesProps {
  version: string;
  token: string;
  onCreate: (priority: TodoPriority) => void;
}

const CreateTodoPriority: React.FC<CreateTodoPrioritiesProps> = ({ version, token, onCreate }) => {
  const [priorityName, setPriorityName] = useState('');
  const [prioritySort, setPrioritySort] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!priorityName || !prioritySort) {
      setError('All fields are required.');
      return;
    }

    try {
      const newPriority: Partial<TodoPriority> = {
        priorityName,
        prioritySort: Number(prioritySort),
      };

      const createdPriority = await createTodoPriorities(token, version, newPriority);
      onCreate(createdPriority);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Create Todo Priority</h2>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles["input-group"]}>
        <label htmlFor="priorityName">Priority Name:</label>
        <input
          type="text"
          id="priorityName"
          value={priorityName}
          onChange={(e) => setPriorityName(e.target.value)}
        />
      </div>
      <div className={styles["input-group"]}>
        <label htmlFor="prioritySort">Priority Sort:</label>
        <input
          type="number"
          id="prioritySort"
          value={prioritySort}
          onChange={(e) => setPrioritySort(e.target.value)}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateTodoPriority;
