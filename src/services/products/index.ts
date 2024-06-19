import { API_ENDPOINT } from "@core/config/app";
import { HTTP_REQUEST } from "@core/libs/api/config";
import { ApiResponse } from "@core/libs/api/types";
import { ProductModel } from "@model/product";

export const productService = {
  get: HTTP_REQUEST.get<ApiResponse<ProductModel[]>>(API_ENDPOINT.products),
  getById: (id: string) =>
    HTTP_REQUEST.get<ApiResponse<ProductModel>>(
      `${API_ENDPOINT.products}/${id}`
    ),
  post: HTTP_REQUEST.post<ApiResponse<ProductModel>>(API_ENDPOINT.products),
  put: (id: string) =>
    HTTP_REQUEST.put<ApiResponse<ProductModel>>(
      `${API_ENDPOINT.products}/${id}`
    ),
  delete: (id: string) =>
    HTTP_REQUEST.delete<ApiResponse<void>>(`${API_ENDPOINT.products}/${id}`),
};
