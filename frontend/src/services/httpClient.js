export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8089/api';

export async function handleResponse(response) {
  if (!response.ok) {
    let errorMessage = `Error: ${response.status} ${response.statusText}`;
    try {
      const errorData = await response.json();
      if (errorData.message) {
        errorMessage = errorData.message;
      }
      if (errorData.validationErrors) {
        const details = Object.entries(errorData.validationErrors)
          .map(([field, msg]) => `${field}: ${msg}`)
          .join(', ');
        errorMessage = `${errorMessage} (${details})`;
      }
    } catch {
      // Ignorar parse error
    }
    throw new Error(errorMessage);
  }
  if (response.status === 204 || response.headers.get('content-length') === '0') {
    return null;
  }
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

export const http = {
  get: (endpoint) => fetch(`${API_BASE_URL}${endpoint}`).then(handleResponse),
  post: (endpoint, data) =>
    fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse),
  put: (endpoint, data) =>
    fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse),
  delete: (endpoint) => fetch(`${API_BASE_URL}${endpoint}`, { method: 'DELETE' }).then(handleResponse),
};
