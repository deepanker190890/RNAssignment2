import { useState } from 'react';
import { ApiHandler } from '../api/apiHandler';

export function useApi<T>() {
  const [handler, setHandler] = useState(new ApiHandler<T>());

  const request = async (promise: Promise<{ data: T }>) => {
    const newHandler = new ApiHandler<T>();
    await newHandler.execute(promise);
    setHandler(newHandler);
    return newHandler;
  };

  return { ...handler, request };
}
