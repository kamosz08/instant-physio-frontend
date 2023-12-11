export interface RichData<T> {
  data: T[];
  page: number;
  isLast: boolean;
  limit: number;
}
