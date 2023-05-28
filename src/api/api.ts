// src/api.ts

import axios from 'axios';

const API_BASE_URL = 'https://taltech.akaver.com/api';

const getAPIVersionPath = (version: string) => `/v${version}`;

export interface ListItem {
  id: string;
  description: string;
  completed: boolean;
}

export interface TodoCategory {
  id: string;
  categoryName: string;
  categorySort: number;
  syncDt: Date;
}

export interface TodoPriority {
  id: string;
  appUserId: string;
  priorityName: string;
  prioritySort: number;
  syncDt: string;
}

export interface TodoTask {
  id: string;
  taskName:	string;
  taskSort:	number;
  createdDt:	Date;
  dueDt:	Date;
  isCompleted:	boolean;
  isArchived:	boolean;
  todoCategoryId:	string;
  todoPriorityId:	string;
  syncDt: string;
}

export interface LoginData {
  token: string;
  refreshToken: string;
  firstName: string;
  lastName: string;
}


export async function loginRequest(email: string, password: string): Promise<LoginData> {
    const response = await axios.post<LoginData>(`${API_BASE_URL}/v1/Account/Login`, {
      email,
      password,
    });
  
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Login failed. Please check your email and password.');
    }
}

export const registerRequest = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ): Promise<LoginData> => {
    const response = await axios.post<LoginData>(
      `${API_BASE_URL}/v1/Account/Register`,
      {
        email,
        password,
        firstName,
        lastName,
      },
    );
    return response.data;
};

//------------------------------------------------------------------------------------------------
//ListItems CRUD

export const fetchListItems = async (token: string, version: string): Promise<ListItem[]> => {
  try {
      const response = await axios.get<ListItem[]>(`${API_BASE_URL}${getAPIVersionPath(version)}/ListItems`, { 
        headers: { Authorization: `Bearer ${token}` },
        params: { apiKey: process.env.REACT_APP_API_KEY }
      });
      return response.data;
  }
  catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 404) {
          throw new Error('The requested resource could not be found. Please check your backend server.');
        } else {
          throw new Error('An unknown error occurred. Please try again later.');
      }
  }
};

export const fetchListItemsById = async (token: string, id: string, version: string): Promise<ListItem> => {
  const response = await axios.get<ListItem>(`${API_BASE_URL}${getAPIVersionPath(version)}/ListItems/${id}`,
    { 
      headers: { Authorization: `Bearer ${token}` },
      params: { apiKey: process.env.REACT_APP_API_KEY } 
    });
  return response.data;
};

export const updateListItems = async (token: string, id: string, version: string, data: Partial<ListItem>): Promise<void> => {
  await axios.put(`${API_BASE_URL}${getAPIVersionPath(version)}/ListItems/${data.id}`, data,
    { 
      headers: { Authorization: `Bearer ${token}` },
      params: { apiKey: process.env.REACT_APP_API_KEY },
    });
};

export const deleteListItems = async (token: string, id: string, version: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}${getAPIVersionPath(version)}/ListItems/${id}`,
    { 
      headers: { Authorization: `Bearer ${token}` },
      params: { apiKey: process.env.REACT_APP_API_KEY }
    });
};

export async function createListItems(token: string, version: string, listItem: Partial<ListItem>): Promise<ListItem> {
  try {
    const response = await axios.post<ListItem>(`${API_BASE_URL}/v${version}/ListItems`, listItem,
      { headers: { Authorization: `Bearer ${token}` },
        params: { apiKey: process.env.REACT_APP_API_KEY }
      },);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response && error.response.status === 404) {
      throw new Error('The requested resource could not be found. Please check your backend server.');
    } else {
      throw new Error('An unknown error occurred. Please try again later.');
    }
  }
}

//TodoCategories CRUD ----------------------------------------------------------------------------

export const fetchTodoCategories = async (token: string, version: string): Promise<TodoCategory[]> => {
    try {
        const response = await axios.get<TodoCategory[]>(`${API_BASE_URL}${getAPIVersionPath(version)}/TodoCategories`, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    }
    catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response && error.response.status === 404) {
            throw new Error('The requested resource could not be found. Please check your backend server.');
          } else {
            throw new Error('An unknown error occurred. Please try again later.');
        }
    }
};

export const fetchTodoCategoryById = async (token: string, id: string, version: string): Promise<TodoCategory> => {
  const response = await axios.get<TodoCategory>(`${API_BASE_URL}/${getAPIVersionPath(version)}/TodoCategories/${id}`,  { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

export const updateTodoCategory = async (token: string, id: string, version: string, data: Partial<TodoCategory>): Promise<void> => {
  await axios.put(`${API_BASE_URL}${getAPIVersionPath(version)}/TodoCategories/${data.id}`, data,  { headers: { Authorization: `Bearer ${token}` } });
};

export const deleteTodoCategory = async (token: string, id: string, version: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}${getAPIVersionPath(version)}/TodoCategories/${id}`,  { headers: { Authorization: `Bearer ${token}` } });
};

export async function createTodoCategory(token: string, version: string, category: Partial<TodoCategory>): Promise<TodoCategory> {
  try {
    const response = await axios.post<TodoCategory>(`${API_BASE_URL}/v${version}/TodoCategories`, category,  { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response && error.response.status === 404) {
      throw new Error('The requested resource could not be found. Please check your backend server.');
    } else {
      throw new Error('An unknown error occurred. Please try again later.');
    }
  }
}

//------------------------------------------------------------------------------------------------
//TodoPriorities CRUD

export const fetchTodoPriorities = async (token: string, version: string): Promise<TodoPriority[]> => {
  try {
      const response = await axios.get<TodoPriority[]>(`${API_BASE_URL}${getAPIVersionPath(version)}/TodoPriorities`, { headers: { Authorization: `Bearer ${token}` } });
      return response.data;
  }
  catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 404) {
          throw new Error('The requested resource could not be found. Please check your backend server.');
        } else {
          throw new Error('An unknown error occurred. Please try again later.');
      }
  }
};

export const fetchTodoPrioritiesById = async (token: string, id: string, version: string): Promise<TodoPriority> => {
  const response = await axios.get<TodoPriority>(`${API_BASE_URL}/${getAPIVersionPath(version)}/TodoPriorities/${id}`,  { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

export const updateTodoPriorities = async (token: string, id: string, version: string, data: Partial<TodoPriority>): Promise<void> => {
  await axios.put(`${API_BASE_URL}${getAPIVersionPath(version)}/TodoPriorities/${data.id}`, data,  { headers: { Authorization: `Bearer ${token}` } });
};

export const deleteTodoPriorities = async (token: string, id: string, version: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}${getAPIVersionPath(version)}/TodoPriorities/${id}`,  { headers: { Authorization: `Bearer ${token}` } });
};

export async function createTodoPriorities(token: string, version: string, category: Partial<TodoPriority>): Promise<TodoPriority> {
  try {
    const response = await axios.post<TodoPriority>(`${API_BASE_URL}/v${version}/TodoPriorities`, category,  { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response && error.response.status === 404) {
      throw new Error('The requested resource could not be found. Please check your backend server.');
    } else {
      throw new Error('An unknown error occurred. Please try again later.');
    }
  }
}

//------------------------------------------------------------------------------------------------
//TodoTasks CRUD

export const fetchTodoTasks = async (token: string, version: string): Promise<TodoTask[]> => {
  try {
      const response = await axios.get<TodoTask[]>(`${API_BASE_URL}${getAPIVersionPath(version)}/TodoTasks`, { headers: { Authorization: `Bearer ${token}` } });
      return response.data;
  }
  catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 404) {
          throw new Error('The requested resource could not be found. Please check your backend server.');
        } else {
          throw new Error('An unknown error occurred. Please try again later.');
      }
  }
};

export const fetchTodoTasksById = async (token: string, id: string, version: string): Promise<TodoTask> => {
  const response = await axios.get<TodoTask>(`${API_BASE_URL}/${getAPIVersionPath(version)}/TodoTasks/${id}`,  { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

export const updateTodoTasks = async (token: string, id: string, version: string, data: Partial<TodoTask>): Promise<void> => {
  await axios.put(`${API_BASE_URL}${getAPIVersionPath(version)}/TodoTasks/${data.id}`, data,  { headers: { Authorization: `Bearer ${token}` } });
};

export const deleteTodoTasks = async (token: string, id: string, version: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}${getAPIVersionPath(version)}/TodoTasks/${id}`,  { headers: { Authorization: `Bearer ${token}` } });
};

export async function createTodoTasks(token: string, version: string, category: Partial<TodoTask>): Promise<TodoTask> {
  try {
    const response = await axios.post<TodoTask>(`${API_BASE_URL}/v${version}/TodoTasks`, category,  { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response && error.response.status === 404) {
      throw new Error('The requested resource could not be found. Please check your backend server.');
    } else {
      throw new Error('An unknown error occurred. Please try again later.');
    }
  }
}