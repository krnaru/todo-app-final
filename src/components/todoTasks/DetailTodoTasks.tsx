// src/components/DetailTodoCategory.tsx

import React, { useState, useEffect } from 'react';
import { fetchTodoCategoryById, fetchTodoPrioritiesById, fetchTodoTasksById, TodoTask } from '../../api/api';
import Modal from '../reusables/Modal';
import Moment from 'react-moment';
import { TodoCategory } from '../../api/api';
import { TodoPriority } from '../../api/api';
import styles from '../styles/form.module.css';

interface DetailTodoTasksProps {
  token: string;  
  taskId: string;
  version: string;
  onClose: () => void;
}


const DetailTodoTask: React.FC<DetailTodoTasksProps> = ({ token, taskId, version, onClose }) => {
  const [task, setTask] = useState<TodoTask | null>(null);
  const [category, setCategory] = useState<TodoCategory>();
  const [priority, setPriority] = useState<TodoPriority>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      const data = await fetchTodoTasksById(token, taskId, version);
      setTask(data);
    };

    fetchTask();
  }, [token, taskId, version]);

  useEffect(() => {
    const fetchCategoriesAndPriorities = async () => {
      try {
        const taskCategory = await fetchTodoCategoryById(token, task?.todoCategoryId!, version);
        const taskPriority = await fetchTodoPrioritiesById(token,task?.todoPriorityId!, version);
        setCategory(taskCategory);
        setPriority(taskPriority);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    };

    fetchCategoriesAndPriorities();
  }, [task?.todoCategoryId, task?.todoPriorityId, token, version]);

  return (
    <Modal onClose={onClose}>
      {task ? (
        <div>
          <h2>Task Details</h2>
          {error && <p className={styles.error}>{error}</p>}
          <p>Name: {task.taskName}</p>
          <p>Sort: {task.taskSort}</p>
          <p>Task created at: <Moment format="DD/MM/YYYY" date={task.createdDt}/></p>
          <p>Task due at: <Moment format="DD/MM/YYYY" date={task.dueDt}/></p>
          <p>Completed: {task.isCompleted ? '✔️' : '❌'}</p>
          <p>Archived: {task.isArchived ? '✔️' : '❌'}</p>
          <p>Category name: {category?.categoryName}</p>
          <p>Priority name: {priority?.priorityName}</p>
          <p>Sync Date: <Moment format="DD/MM/YYYY" date={task.syncDt}/></p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </Modal>
  );
};

export default DetailTodoTask;
