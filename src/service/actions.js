import axios from 'axios';

const API_URL = "https://localhost:44397/api/Tareas";

export const getTareas = async () => {
  const response = await axios.get(API_URL);
  return response.data;
}

export const deleteTarea = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response;
}

export const postTarea = async (obj) => {
  const response = await axios.post(API_URL, obj);
  return response;
}

export const putTarea = async (id, obj) => {
  const response = await axios.put(`${API_URL}/${id}`, obj);
  return response;
}