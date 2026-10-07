import type { APIRequestContext } from '@playwright/test';
import type { ApiResponse } from '../types/common';

type Params = Record<string, string | number | boolean>;
type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestOptions {
  params?: Params;
  data?: unknown;
}

export class ApiClient {
  constructor(private readonly request: APIRequestContext) {}

  get<T>(path: string, options?: Omit<RequestOptions, 'data'>): Promise<ApiResponse<T>> {
    return this.send<T>('GET', path, options);
  }

  post<T>(path: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.send<T>('POST', path, { data });
  }

  put<T>(path: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.send<T>('PUT', path, { data });
  }

  patch<T>(path: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.send<T>('PATCH', path, { data });
  }

  delete<T = undefined>(path: string): Promise<ApiResponse<T>> {
    return this.send<T>('DELETE', path);
  }

  private async send<T>(
    method: Method,
    path: string,
    options: RequestOptions = {},
  ): Promise<ApiResponse<T>> {

    const url = path.replace(/^\/+/, '');
    const res = await this.request.fetch(url, {
      method,
      params: options.params,
      data: options.data,
    });

    const text = await res.text();
    let body: T;
    try {
      body = (text ? JSON.parse(text) : undefined) as T;
    } catch {
      throw new Error(`${method} ${url} -> ${res.status()}: response is not valid JSON:\n${text}`);
    }

    return { status: res.status(), ok: res.ok(), headers: res.headers(), body };
  }
}
