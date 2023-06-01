import React, { useEffect, useState } from 'react';
import { createTodoTasks, TodoTask, fetchTodoCategories, fetchTodoPriorities, TodoCategory, TodoPriority} from '../../api/api';
import styles from '../styles/form.module.css';

interface CreateTodoTasksProps {
  version: string;
  token: string;
  onCreate: (task: TodoTask) => void;
}

const CreateTodoTask: React.FC<CreateTodoTasksProps> = ({ version, token, onCreate }) => {
  const [taskName, setTaskName] = useState('');
  const [taskSort, setTaskSort] = useState('');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isArchived, setIsArchived] = useState<boolean>(false);
  const [dueDate, setDueDate] = useState('');
  const [categories, setCategories] = useState<TodoCategory[]>([]);
  const [priorities, setPriorities] = useState<TodoPriority[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [selectedPriorityId, setSelectedPriorityId] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategoriesAndPriorities = async () => {
      try {
        const fetchedCategories = await fetchTodoCategories(token, version);
        const fetchedPriorities = await fetchTodoPriorities(token, version);
        setCategories(fetchedCategories);
        setPriorities(fetchedPriorities);
        if (fetchedCategories.length > 0) setSelectedCategoryId(fetchedCategories[0].id);
        if (fetchedPriorities.length > 0) setSelectedPriorityId(fetchedPriorities[0].id);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    };

    fetchCategoriesAndPriorities();
  }, [token, version]);
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!taskName || !taskSort || !dueDate) {
      setError('All fields are required.');
      return;
    }

    try {
      const newTask: Partial<TodoTask> = {
        taskName,
        taskSort: Number(taskSort),
        todoCategoryId: selectedCategoryId,
        todoPriorityId: selectedPriorityId,
        dueDt: dueDate,
        isCompleted,
        isArchived,
      };

      const createdTask = await createTodoTasks(token, version, newTask);
      onCreate(createdTask);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Create Todo Task</h2>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles["input-group"]}>
        <label htmlFor="taskName">Task Name:</label>
        <input
          type="text"
          id="taskName"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
      </div>
      <div className={styles["input-group"]}>
        <label htmlFor="taskSort">Task Sort:</label>
        <input
          type="number"
          id="taskSort"
          value={taskSort}
          onChange={(e) => setTaskSort(e.target.value)}
        />
      </div>
      <div className={styles["input-group"]}>
        <label htmlFor="isCompleted" className={styles['checkbox-label']}>
          <input
            type="checkbox"
            id="isCompleted"
            className={styles['checkbox-input']}
            checked={isCompleted}
            onChange={(e) => setIsCompleted(e.target.checked)}
          />
          <span className={styles['checkbox-checkmark']}></span>
          Is Task completed?
        </label>
      </div>
      <div className={styles["input-group"]}>
        <label htmlFor="isArchived" className={styles['checkbox-label']}>
          <input
            type="checkbox"
            id="isArchived"
            className={styles['checkbox-input']}
            checked={isArchived}
            onChange={(e) => setIsArchived(e.target.checked)}
          />
          <span className={styles['checkbox-checkmark']}></span>
          Is Task archived?
        </label>
      </div>
        <div className={styles["input-group"]}>
        <label htmlFor="taskSort">Task Due date:</label>
        <input type="date" id="start" value={dueDate} onChange={(e) => setDueDate(e.target.value)} name="trip-start"></input>
      </div>
      <div className={styles["input-group"]}>
        <label htmlFor="taskCategory">Task Category:</label>
        <select id="taskCategory" value={selectedCategoryId} onChange={(e) => setSelectedCategoryId(e.target.value)}>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.categoryName}
            </option>
          ))}
        </select>
      </div>
      <div className={styles["input-group"]}>
        <label htmlFor="taskPriority">Task Priority:</label>
        <select id="taskPriority" value={selectedPriorityId} onChange={(e) => setSelectedPriorityId(e.target.value)}>
          {priorities.map((priority) => (
            <option key={priority.id} value={priority.id}>
              {priority.priorityName}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateTodoTask;
