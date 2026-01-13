export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * internal API request function
 */
async function request<T extends Record<string, unknown>>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  
  const response = await fetch(url, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API Error: ${response.status}`);
  }

  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    return {} as T;
  }

  const text = await response.text();
  if (!text) {
    return {} as T;
  }

  return JSON.parse(text);
}

/**
 * Axios style API client
 */
export const api = {
  get: <T extends Record<string, unknown>>(endpoint: string) => 
    request<T>(endpoint, { method: 'GET' }),
  
  post: <T extends Record<string, unknown>>(endpoint: string, data: Record<string, unknown>) => 
    request<T>(endpoint, { 
      method: 'POST', 
      body: JSON.stringify(data) 
    }),
  
  put: <T extends Record<string, unknown>>(endpoint: string, data: Record<string, unknown>) => 
    request<T>(endpoint, { 
      method: 'PUT', 
      body: JSON.stringify(data) 
    }),
  
  delete: <T extends Record<string, unknown>>(endpoint: string) => 
    request<T>(endpoint, { method: 'DELETE' }),
};

