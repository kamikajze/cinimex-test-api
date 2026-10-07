export interface ApiResponse<T> {
  status: number;
  ok: boolean;
  headers: Record<string, string>;
  body: T;
}

export interface ErrorResponse {
  error: string;
}

export type EmptyObject = Record<string, never>;

export interface Support {
  url: string;
  text: string;
}
