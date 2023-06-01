import React, { useState, useEffect } from 'react';
import { fetchTodoPrioritiesById, TodoPriority } from '../../api/api';
import Modal from '../reusables/Modal';
import Moment from 'react-moment';

interface DetailTodoPrioritiesProps {
  token: string;  
  priorityId: string;
  version: string;
  onClose: () => void;
}

const DetailTodoPriority: React.FC<DetailTodoPrioritiesProps> = ({ token, priorityId, version, onClose }) => {
  const [priority, setPriority] = useState<TodoPriority | null>(null);

  useEffect(() => {
    const fetchPriority = async () => {
      const data = await fetchTodoPrioritiesById(token, priorityId, version);
      setPriority(data);
    };

    fetchPriority();
  }, [token, priorityId, version]);

  return (
    <Modal onClose={onClose}>
      {priority ? (
        <div>
          <h2>Priority Details</h2>
          <p>Name: {priority.priorityName}</p>
          <p>Sort: {priority.prioritySort}</p>
          <p>Sync Date: <Moment format="DD/MM/YYYY HH:MM" date={priority.syncDt}/></p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </Modal>
  );
};

export default DetailTodoPriority;
