import React from 'react';
import { ListItem, TodoCategory } from '../../api/api';

interface ReadListItemsProps {
  listItem: ListItem;
}

const ReadListItems: React.FC<ReadListItemsProps> = ({ listItem }) => {
  return (
    <div>
      <h3>List item Details</h3>
      <ul>
        <li><b>Item description:</b> {listItem.description}</li>
        <li><b>Item completed:</b> {listItem.completed ? '✔️' : '❌'}</li>
      </ul>
    </div>
  );
};

export default ReadListItems;
