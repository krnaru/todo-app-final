import React, { useEffect, useState } from 'react';
import { TodoCategory, TodoPriority, TodoTask, fetchTodoCategories, fetchTodoPriorities, updateTodoTasks } from '../../api/api';
import buttonStyle from '../../styles/App.module.css'; 
import styles from '../styles/form.module.css';
import moment from 'moment';


interface UpdateTodoTasksProps {
  task: TodoTask;
  onUpdate: (id: string, data: Partial<TodoTask>) => void;
  version: string;
  token: string;
}

const UpdateTodoTask: React.FC<UpdateTodoTasksProps> = ({ 
  task,
  onUpdate,
  version,
  token
 }) => {
  const [taskName, setTaskName] = useState(task.taskName);
  const [taskSort, setTaskSort] = useState(task.taskSort);
  const [dueDate, setDueDate] = useState(task.dueDt);
  const [isCompleted, setIsCompleted] = useState<boolean>(task.isCompleted);
  const [isArchived, setIsArchived] = useState<boolean>(task.isArchived);
  const [categories, setCategories] = useState<TodoCategory[]>([]);
  const [priorities, setPriorities] = useState<TodoPriority[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(task.todoCategoryId);
  const [selectedPriorityId, setSelectedPriorityId] = useState<string>(task.todoPriorityId);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategoriesAndPriorities = async () => {
      try {
        const fetchedCategories = await fetchTodoCategories(token, version);
        const fetchedPriorities = await fetchTodoPriorities(token, version);
        setCategories(fetchedCategories);
        setPriorities(fetchedPriorities);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    };

    fetchCategoriesAndPriorities();
  }, [token, version]);
  
  const handleSubmit = async (e: React.FormEvent) => {

    if (!taskName || !taskSort) {
      if(selectedCategoryId.trim() === "" || selectedPriorityId.trim() === "") {
        setError('All fields are required.');
        return; 
      }
    }

    e.preventDefault();
    const updatedData: Partial<TodoTask> = {
      id: task.id,
      taskName,
      taskSort,
      isCompleted: isCompleted,
      isArchived: isArchived,
      todoCategoryId: selectedCategoryId,
      todoPriorityId: selectedPriorityId,
      dueDt: dueDate,
      syncDt: task.syncDt
    };
    try {
      const updatedTask = await updateTodoTasks(
        token,
        task.id,
        version,
        updatedData,
      );
      onUpdate(task.id, { taskName, taskSort });
    }
    catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles["form__title"]}>Update todo task</h2>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles["input-group"]}>
          <label htmlFor="taskName">Task name:</label>
          <input
            id="taskName"
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
        </div>  
        <div className={styles["input-group"]}>
          <label htmlFor="taskSort">Task sort:</label>
          <input
            id="taskSort"
            className='input-box'
            type="number"
            value={taskSort}
            onChange={(e) => setTaskSort(e.target.valueAsNumber)}
            required
          />
        </div>
        <div className={styles["input-group"]}>
        <label className={styles['checkbox-label']}>
          <input
            type="checkbox"
            className={styles['checkbox-input']}
            checked={isCompleted}
            onChange={(e) => setIsCompleted(e.target.checked)}
          />
          <span className={styles['checkbox-checkmark']}></span>
          Is Task completed?
        </label>
      </div>
      <div className={styles["input-group"]}>
        <label className={styles['checkbox-label']}>
          <input
            type="checkbox"
            className={styles['checkbox-input']}
            checked={isArchived}
            onChange={(e) => setIsArchived(e.target.checked)}
          />
          <span className={styles['checkbox-checkmark']}></span>
          Is Task archived?
        </label>
      </div>
      <div className={styles["input-group"]}>
        <label id="taskDueDate">Task due date:</label>
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value == null ? '' : e.target.value)} name="trip-start"></input>
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
      <button className={`${styles.button} ${buttonStyle.button}`} type="submit">Update</button>
      </form>
    </div>
  );  
};

export default UpdateTodoTask;
