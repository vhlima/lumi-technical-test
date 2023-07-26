import { AxiosError } from 'axios';

export const raiseAxiosError = (error: unknown) => {
  if (error instanceof AxiosError) {
    if (error.response && error.response.data.error) {
      throw new Error(error.response.data.error);
    }

    if (error.request) {
      throw new Error(error.request);
    }
  }

  if (error instanceof Error) {
    throw error;
  }

  throw new Error('Unexpected error occurred');
};