export interface IRawPaginatedResponse<T> {
  total_count: number;
  current_page: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
