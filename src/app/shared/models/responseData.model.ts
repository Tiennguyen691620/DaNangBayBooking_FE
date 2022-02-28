

export class ResponseData<T> {
  data?: T;
  status?: boolean;
  error?: {
    code?: string;
    message?: string;
  }
}