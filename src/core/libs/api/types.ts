export interface QueryParams {
  page?: number,
  perPage?: number,
  name?: string,
  search?: string,
  categoryId?: string
}

export interface ApiOption {
  contentType?: "json" | "form-data" | "url-encoded";
  bearerToken?: string;
  headers?: HeadersInit;
  path?: string;
  queryParams?: QueryParams
}

export interface MetaResponse {
  page?: number,
  perPage?: number,
  totalData?: number,
  totalPages?: number
}

export interface ApiResponse<Res = unknown> {
  status?: string,
  message?: string,
  data?: Res,
  meta: MetaResponse
}

export const getContentType = (type?: ApiOption["contentType"]) => {
  switch (type) {
    case "form-data":
      return "multipart/form-data";
    case "url-encoded":
      return "application/x-www-form-urlencoded";
    default:
      return "application/json";
  }
};

export type MethodTypes = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
