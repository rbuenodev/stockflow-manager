import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3200',
});

// Interceptor de requisição para adicionar o token e a chave da API
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    // Adiciona a chave da API (autenticação mínima do front)
    config.headers['x-api-key'] = process.env.NEXT_PUBLIC_API_KEY;

    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Interceptor de resposta para tratar erros de autenticação (401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
