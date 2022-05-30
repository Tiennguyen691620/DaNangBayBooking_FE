

// export class ResponseData<T> {
//   data?: T;
//   status?: boolean;
//   error?: {
//     code?: string;
//     message?: string;
//   }
// }

export class ResponseData<T> {
  isSuccessed?: boolean;
  message?: string;
  data?: T;
}