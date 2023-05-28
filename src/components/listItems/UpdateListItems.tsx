import React, { useState } from 'react';
import { ListItem, updateListItems } from '../../api/api';
import buttonStyle from '../../styles/App.module.css'; 
import styles from '../styles/form.module.css';

interface UpdateListItemsProps {
  listItem: ListItem;
  onUpdate: (id: string, data: Partial<ListItem>) => void;
  version: string;
  token: string;
}

const UpdateListItems: React.FC<UpdateListItemsProps> = ({ 
  listItem,
  onUpdate,
  version,
  token
 }) => {
  const [description, setListItemDescription] = useState(listItem.description);
  const [completed, setListItemCompleted] = useState(listItem.completed);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedData: Partial<ListItem> = {
      id: listItem.id,
      description,
      completed,
    };
    try {
      const updatedListItem = await updateListItems(
        token,
        listItem.id,
        version,
        updatedData,
      );
      onUpdate(listItem.id, { description, completed });
    }
    catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2 className={styles["form__title"]}>Update list item</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles["input-group"]}>
          <label>
            Item description:
            <input
              type="text"
              value={description}
              onChange={(e) => setListItemDescription(e.target.value)}
              required
            />
          </label>
        </div>
        <div className={styles["input-group"]}>
        <label className={styles['checkbox-label']}>
          <input
            type="checkbox"
            className={styles['checkbox-input']}
            checked={completed} // for checkbox it's better to use checked instead of value
            onChange={(e) => setListItemCompleted(e.target.checked)} // we set it based on the checked property, not value
          />
          <span className={styles['checkbox-checkmark']}></span>
          Item completed?
        </label>
      </div>
        <button className={`${styles.button} ${buttonStyle.button}`} type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateListItems;
