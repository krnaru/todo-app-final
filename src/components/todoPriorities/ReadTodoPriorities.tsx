import React from 'react';
import { TodoPriority } from '../../api/api';

interface ReadTodoPrioritieProps {
  priority: TodoPriority;
}

const ReadTodoPriority: React.FC<ReadTodoPrioritieProps> = ({ priority }) => {
  return (
    <div>
      <h3>Todo Priorities Details</h3>
      <ul>
        <li><b>Priority Name:</b> {priority.priorityName}</li>
        <li><b>Priority Sort:</b> {priority.prioritySort}</li>
      </ul>
    </div>
  );
};

export default ReadTodoPriority;
