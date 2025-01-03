import { IPaginatedResponse, IRawPaginatedResponse } from '../types';
import { UnifiedApiClient } from './UnifiedApiClient';

export class PaginatedResponseHandler<T> {
  private totalCount: number = 0;
  private currentPage: number = 1;
  private nextPage: string | null = null;
  private previousPage: string | null = null;
  private results: T[] = [];
  private hasNextPage: boolean = false;
  private hasPreviousPage: boolean = false;

  private unifiedApiClient: UnifiedApiClient;

  constructor(unifiedApiClient: UnifiedApiClient, initialData?: IRawPaginatedResponse<T>) {
    this.unifiedApiClient = unifiedApiClient;

    if (initialData) {
      this.updatePagination({
        totalCount: initialData.total_count,
        currentPage: initialData.current_page,
        nextPage: initialData.next,
        previousPage: initialData.previous,
        results: initialData.results,
        hasNextPage: initialData.next !== null,
        hasPreviousPage: initialData.previous !== null,
      });
    }
  }

  updatePagination(response: IPaginatedResponse<T>): void {
    this.totalCount = response.totalCount;
    this.currentPage = response.currentPage;
    this.nextPage = response.nextPage;
    this.previousPage = response.previousPage;
    this.results = response.results;
    this.hasNextPage = response.hasNextPage;
    this.hasPreviousPage = response.hasPreviousPage;
  }

  getCurrentResponse(): IPaginatedResponse<T> {
    return {
      totalCount: this.totalCount,
      currentPage: this.currentPage,
      nextPage: this.nextPage,
      previousPage: this.previousPage,
      results: this.results,
      hasNextPage: this.hasNextPage,
      hasPreviousPage: this.hasPreviousPage,
    };
  }

  async goToNextPage(): Promise<void> {
    if (this.hasNextPage && this.nextPage) {
      const response: IRawPaginatedResponse<T> = await this.unifiedApiClient.api.requestUri(this.nextPage);
      this.updatePagination({
        totalCount: response.total_count,
        currentPage: response.current_page,
        nextPage: response.next,
        previousPage: response.previous,
        results: response.results,
        hasNextPage: response.next !== null,
        hasPreviousPage: response.previous !== null,
      });
    } else {
      throw new Error('No next page available');
    }
  }

  async goToPreviousPage(): Promise<void> {
    if (this.hasPreviousPage && this.previousPage) {
      const response: IRawPaginatedResponse<T> = await this.unifiedApiClient.api.requestUri(this.previousPage);
      this.updatePagination({
        totalCount: response.total_count,
        currentPage: response.current_page,
        nextPage: response.next,
        previousPage: response.previous,
        results: response.results,
        hasNextPage: response.next !== null,
        hasPreviousPage: response.previous !== null,
      });
    } else {
      throw new Error('No previous page available');
    }
  }

  resetPagination(): void {
    this.totalCount = 0;
    this.currentPage = 1;
    this.nextPage = null;
    this.previousPage = null;
    this.results = [];
    this.hasNextPage = false;
    this.hasPreviousPage = false;
  }
}
