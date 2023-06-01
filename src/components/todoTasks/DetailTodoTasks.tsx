// src/components/DetailTodoCategory.tsx

import React, { useState, useEffect } from 'react';
import { fetchTodoTasksById, TodoTask } from '../../api/api';
import Modal from '../reusables/Modal';
import Moment from 'react-moment';

interface DetailTodoTasksProps {
  token: string;  
  taskId: string;
  version: string;
  onClose: () => void;
}

const DetailTodoTask: React.FC<DetailTodoTasksProps> = ({ token, taskId, version, onClose }) => {
  const [task, setTask] = useState<TodoTask | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      const data = await fetchTodoTasksById(token, taskId, version);
      setTask(data);
    };

    fetchTask();
  }, [token, taskId, version]);

  return (
    <Modal onClose={onClose}>
      {task ? (
        <div>
          <h2>Task Details</h2>
          <p>ID: {task.id}</p>
          <p>Name: {task.taskName}</p>
          <p>Sort: {task.taskSort}</p>
          <p>Task created at: <Moment format="DD/MM/YYYY" date={task.createdDt}/></p>
          <p>Task due at: <Moment format="DD/MM/YYYY" date={task.dueDt}/></p>
          <p>Completed: {task.isCompleted ? '✔️' : '❌'}</p>
          <p>Archived: {task.isArchived ? '✔️' : '❌'}</p>
          <p>Category id: {task.todoCategoryId}</p>
          <p>Priority id: {task.todoPriorityId}</p>
          <p>Sync Date: <Moment format="DD/MM/YYYY" date={task.syncDt}/></p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </Modal>
  );
};

export default DetailTodoTask;
