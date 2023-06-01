import React, { useState, useEffect } from 'react';
import { fetchTodoTasks, TodoTask } from '../api/api';
import styles from './styles/componentStyles.module.css';
import buttonStyle from '../styles/App.module.css' 
import CreateTodoTasks from './todoTasks/CreateTodoTasks';
import ReadTodoTasks from './todoTasks/ReadTodoTasks';
import UpdateTodoTasks from './todoTasks/UpdateTodoTasks';
import DeleteTodoTasks from './todoTasks/DeleteTodoTasks';
import DetailTodoTasks from './todoTasks/DetailTodoTasks';


interface TodoTasksProps {
  token: string;
}

const TodoTasks: React.FC<TodoTasksProps> = ({ token }) => {
  const [tasks, setTasks] = useState<TodoTask[]>([]);
  const [version, setVersion] = useState('1');
  const [error, setError] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState<{ taskId: string } | null>(null);


  useEffect(() => {
    (async () => {
      try {
        const data = await fetchTodoTasks(token, version);
        setTasks(data);
        setError(null);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        }
      }
    })();
  }, [version, token]);

  const handleCreate = (task: TodoTask) => {
    setTasks([...tasks, task]);
  };

  const handleUpdate = (id: string, data: Partial<TodoTask>) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, ...data } : task)));
  };

  const handleDelete = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.componentItem}>
        <CreateTodoTasks
          token={token}
          version={version}
          onCreate={(task) => setTasks([...tasks, task])} />
        {tasks.map((task) => (
          <div key={task.id} className={styles.componentItemCard}>
            <ReadTodoTasks task={task} />
            <UpdateTodoTasks
              token={token}
              version={version}
              task={task}
              onUpdate={(id, data) => {
                setTasks(tasks.map((task) => (task.id === id ? { ...task, ...data } : task)));
              }}
            />
            <DeleteTodoTasks
              taskId={task.id}
              version={version}
              token={token}
              onDelete={() => {
                setTasks(tasks.filter((tsk) => tsk.id !== task.id));
              }}
            />
            <button className={buttonStyle.button} onClick={() => setShowDetails({ taskId: task.id })}>Details</button>
          </div>
        ))}
        {showDetails && (
          <DetailTodoTasks
            token={token}
            taskId={showDetails.taskId}
            version={version}
            onClose={() => setShowDetails(null)}
          />
        )}
      </div>
    </div>
  );
};

export default TodoTasks;
