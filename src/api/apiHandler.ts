import { AxiosError } from 'axios';

export class ApiHandler<T> {
  status: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  data?: T;
  error?: string;

  async execute(promise: Promise<{ data: T }>): Promise<this> {
    this.status = 'loading';
    try {
      const response = await promise;
      this.status = 'success';
      this.data = response.data;
    } catch (err) {
      this.status = 'error';
      this.error = this.handleError(err);
    }
    return this;
  }

  private handleError(error: unknown): string {
    if (error instanceof AxiosError) {
      return error.response?.data?.message || error.message;
    }
    return 'Unexpected error';
  }
}
