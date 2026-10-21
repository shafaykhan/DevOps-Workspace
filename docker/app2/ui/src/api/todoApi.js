import httpClient from "./httpClient.js";

export const createTodo = async (payload) => {
      const response = await httpClient.post('/api/todos', payload);
      return response.data;
};

export const updateTodo = async (payload) => {
      const response = await httpClient.put('/api/todos', payload);
      return response.data;
};

export const getTodos = async () => {
      const response = await httpClient.get('/api/todos');
      return response.data;
};

export const getTodoById = async (id) => {
      const response = await httpClient.get(`/api/todos/${id}`);
      return response.data;
};

export const deleteTodoById = async (id) => {
      const response = await httpClient.delete(`/api/todos/${id}`);
      return response.data;
};
