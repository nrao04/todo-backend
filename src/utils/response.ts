import { Response } from 'express';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp: string;
}

export const sendSuccess = <T>(
  res: Response,
  data: T,
  message?: string,
  statusCode: number = 200
) => {
  const response: ApiResponse<T> = {
    success: true,
    data,
    message,
    timestamp: new Date().toISOString(),
  };

  res.status(statusCode).json(response);
};

export const sendError = (res: Response, error: string, statusCode: number = 500) => {
  const response: ApiResponse = {
    success: false,
    error,
    timestamp: new Date().toISOString(),
  };

  res.status(statusCode).json(response);
};

export const sendCreated = <T>(res: Response, data: T, message?: string) => {
  sendSuccess(res, data, message, 201);
};

export const sendNoContent = (res: Response) => {
  res.status(204).send();
};
