import React, { useState, useEffect } from 'react';
import { fetchListItems, deleteListItems, ListItem } from '../api/api';
import styles from './styles/componentStyles.module.css';
import buttonStyle from '../styles/App.module.css' 
import CreateListItems from './listItems/CreateListItems';
import ReadListItems from './listItems/ReadListItems';
import UpdateListItems from './listItems/UpdateListItems';
import DeleteListItems from './listItems/DeleteListItems';
import DetailListItems from './listItems/DetailListItems';


interface ListItemsProps {
  token: string;
}

const ListItems: React.FC<ListItemsProps> = ({ token }) => {
  const [listItems, setListItems] = useState<ListItem[]>([]);
  const [version, setVersion] = useState('1');
  const [error, setError] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState<{ listItemId: string } | null>(null);


  useEffect(() => {
    (async () => {
      try {
        const data = await fetchListItems(token, version);
        setListItems(data);
        setError(null);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        }
      }
    })();
  }, [version, token]);

  const handleCreate = (listItem: ListItem) => {
    setListItems([...listItems, listItem]);
  };

  const handleUpdate = (id: string, data: Partial<ListItem>) => {
    setListItems(listItems.map((item) => (item.id === id ? { ...item, ...data } : item)));
  };

  const handleDelete = (id: string) => {
    setListItems(listItems.filter((item) => item.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.componentItem}>
        <CreateListItems 
          token={token}
          version={version}
          onCreate={(listItem) => setListItems([...listItems, listItem])} />
        {listItems.map((listItem) => (
          <div key={listItem.id} className={styles.componentItemCard}>
            <ReadListItems listItem={listItem} />
            <UpdateListItems
              token={token}
              version={version}
              listItem={listItem}
              onUpdate={(id, data) => {
                setListItems(listItems.map((item) => (item.id === id ? { ...item, ...data } : item)));
              }}
            />
            <DeleteListItems
              listItemId={listItem.id}
              version={version}
              token={token}
              onDelete={() => {
                setListItems(listItems.filter((item) => item.id !== listItem.id));
              }}
            />
            <button className={buttonStyle.button} onClick={() => setShowDetails({ listItemId: listItem.id })}>Details</button>
          </div>
        ))}
        {showDetails && (
          <DetailListItems
            token={token}
            listItemId={showDetails.listItemId}
            version={version}
            onClose={() => setShowDetails(null)}
          />
        )}
      </div>
    </div>
  );
};

export default ListItems;
