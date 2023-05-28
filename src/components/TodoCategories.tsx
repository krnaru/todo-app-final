import React, { useState, useEffect } from 'react';
import { fetchTodoCategories, TodoCategory } from '../api/api';
import CreateTodoCategory from './todoCategories/CreateTodoCategory';
import ReadTodoCategory from './todoCategories/ReadTodoCategory';
import UpdateTodoCategory from './todoCategories/UpdateTodoCategory';
import DeleteTodoCategory from './todoCategories/DeleteTodoCategory';
import styles from './styles/componentStyles.module.css';
import buttonStyle from '../styles/App.module.css';
import DetailTodoCategory from './todoCategories/DetailTodoCategory';


interface TodoCategoriesProps {
  token: string;
}

const TodoCategories: React.FC<TodoCategoriesProps> = ({ token }) => {
  const [categories, setCategories] = useState<TodoCategory[]>([]);
  const [version, setVersion] = useState('1');
  const [error, setError] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState<{ categoryId: string } | null>(null);


  useEffect(() => {
    (async () => {
      try {
        const data = await fetchTodoCategories(token, version);
        setCategories(data);
        setError(null);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        }
      }
    })();
  }, [version, token]);

  const handleCreate = (category: TodoCategory) => {
    setCategories([...categories, category]);
  };

  const handleUpdate = (id: string, data: Partial<TodoCategory>) => {
    setCategories(categories.map((cat) => (cat.id === id ? { ...cat, ...data } : cat)));
  };

  const handleDelete = (id: string) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.componentItem}>
        <CreateTodoCategory 
          token={token}
          version={version}
          onCreate={(category) => setCategories([...categories, category])} />
        {categories.map((category) => (
          <div key={category.id} className={styles.componentItemCard}>
            <ReadTodoCategory category={category} />
            <UpdateTodoCategory
              token={token}
              version={version}
              category={category}
              onUpdate={(id, data) => {
                setCategories(categories.map((cat) => (cat.id === id ? { ...cat, ...data } : cat)));
              }}
            />
            <DeleteTodoCategory
              categoryId={category.id}
              version={version}
              token={token}
              onDelete={() => {
                setCategories(categories.filter((cat) => cat.id !== category.id));
              }}
            />
            <button className={buttonStyle.button} onClick={() => setShowDetails({ categoryId: category.id })}>Details</button>
          </div>
        ))}
        {showDetails && (
          <DetailTodoCategory
            token={token}
            categoryId={showDetails.categoryId}
            version={version}
            onClose={() => setShowDetails(null)}
          />
        )}
      </div>
    </div>
  );
};

export default TodoCategories;
