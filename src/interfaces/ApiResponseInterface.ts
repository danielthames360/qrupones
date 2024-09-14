export interface ApiResponseInterface<T = undefined> {
  success: boolean;
  message: string;
  data?: T;
}
