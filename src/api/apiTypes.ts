export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: 'idle' | 'loading' | 'success' | 'error';
}
