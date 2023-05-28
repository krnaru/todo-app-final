import React, { useState, useEffect } from 'react';
import { TodoPriority, fetchTodoPriorities } from '../api/api';
import styles from './styles/componentStyles.module.css';
import buttonStyle from '../styles/App.module.css';
import CreateTodoPriorities from './todoPriorities/CreateTodoPriorities';
import ReadTodoPriorities from './todoPriorities/ReadTodoPriorities';
import UpdateTodoPriorities from './todoPriorities/UpdateTodoPriorities';
import DeleteTodoPriorities from './todoPriorities/DeleteTodoPriorities';
import DetailTodoPriorities from './todoPriorities/DetailTodoPriorities';


interface TodoPrioritiesProps {
  token: string;
}

const TodoPriorities: React.FC<TodoPrioritiesProps> = ({ token }) => {
  const [priorities, setPriorities] = useState<TodoPriority[]>([]);
  const [version, setVersion] = useState('1');
  const [error, setError] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState<{ priorityId: string } | null>(null);


  useEffect(() => {
    (async () => {
      try {
        const data = await fetchTodoPriorities(token, version);
        setPriorities(data);
        setError(null);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        }
      }
    })();
  }, [version, token]);

  const handleCreate = (category: TodoPriority) => {
    setPriorities([...priorities, category]);
  };

  const handleUpdate = (id: string, data: Partial<TodoPriority>) => {
    setPriorities(priorities.map((prio) => (prio.id === id ? { ...prio, ...data } : prio)));
  };

  const handleDelete = (id: string) => {
    setPriorities(priorities.filter((prio) => prio.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.componentItem}>
        <CreateTodoPriorities
          token={token}
          version={version}
          onCreate={(priority) => setPriorities([...priorities, priority])} />
        {priorities.map((priority) => (
          <div key={priority.id} className={styles.componentItemCard}>
            <ReadTodoPriorities priority={priority} />
            <UpdateTodoPriorities
              token={token}
              version={version}
              priority={priority}
              onUpdate={(id, data) => {
                setPriorities(priorities.map((prio) => (prio.id === id ? { ...prio, ...data } : prio)));
              }}
            />
            <DeleteTodoPriorities
              priorityId={priority.id}
              version={version}
              token={token}
              onDelete={() => {
                setPriorities(priorities.filter((prio) => prio.id !== priority.id));
              }}
            />
            <button className={buttonStyle.button} onClick={() => setShowDetails({ priorityId: priority.id })}>Details</button>
          </div>
        ))}
        {showDetails && (
          <DetailTodoPriorities
            token={token}
            priorityId={showDetails.priorityId}
            version={version}
            onClose={() => setShowDetails(null)}
          />
        )}
      </div>
    </div>
  );
};

export default TodoPriorities;
