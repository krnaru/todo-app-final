import React, { useState } from 'react';
import { createListItems, ListItem} from '../../api/api';
import styles from '../styles/form.module.css';

interface CreateListItemsProps {
  version: string;
  token: string;
  onCreate: (item: ListItem) => void;
}

const CreateListItems: React.FC<CreateListItemsProps> = ({ version, token, onCreate }) => {
  const [description, setListItemDescription] = useState('');
  const [completed, setIsCompleted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!description || !completed) {
      setError('All fields are required.');
      return;
    }

    try {
      const newListItem: Partial<ListItem> = {
        description,
        completed,
      };

      const createdListItem = await createListItems(token, version, newListItem);
      onCreate(createdListItem);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Create List Item</h2>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles["input-group"]}>
        <label htmlFor="listItemDescription">Item description:</label>
        <input
          type="text"
          id="listItemDescription"
          value={description}
          onChange={(e) => setListItemDescription(e.target.value)}
        />
      </div>
      <div className={styles["input-group"]}>
        <label className={styles['checkbox-label']}>
          <input
            type="checkbox"
            id="listItemCompleted"
            className={styles['checkbox-input']}
            checked={completed} // for checkbox it's better to use checked instead of value
            onChange={(e) => setIsCompleted(e.target.checked)} // we set it based on the checked property, not value
          />
          <span className={styles['checkbox-checkmark']}></span>
          Item completed?
        </label>
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateListItems;
