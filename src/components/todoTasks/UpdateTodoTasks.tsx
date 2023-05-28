import React, { useState } from 'react';
import { TodoTask, updateTodoTasks } from '../../api/api';
import buttonStyle from '../../styles/App.module.css'; 
import styles from '../styles/form.module.css';


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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedData: Partial<TodoTask> = {
      id: task.id,
      taskName,
      taskSort,
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
        
        <button className={`${styles.button} ${buttonStyle.button}`} type="submit">Update</button>
      </form>
    </div>
  );  
};

export default UpdateTodoTask;
