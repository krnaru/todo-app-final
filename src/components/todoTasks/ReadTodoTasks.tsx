import React from 'react';
import { TodoTask } from '../../api/api';

interface ReadTodoTasksProps {
  task: TodoTask;
}

const ReadTodoTask: React.FC<ReadTodoTasksProps> = ({ task }) => {
  return (
    <div>
      <h3>Todo Tasks Details</h3>
      <ul>
        <li><b>Task Name:</b> {task.taskName}</li>
        <li><b>Task Sort:</b> {task.taskSort}</li>
        <li><b>Task completed:</b> {task.isCompleted ? '✔️' : '❌'}</li>
        <li><b>Task archived:</b> {task.isArchived ? '✔️' : '❌'}</li>
      </ul>
    </div>
  );
};

export default ReadTodoTask;
