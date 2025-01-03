export interface IPaginatedResponse<T> {
  totalCount: number;
  currentPage: number;
  nextPage: string | null;
  previousPage: string | null;
  results: T[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
