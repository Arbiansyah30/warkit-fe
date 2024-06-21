import { API_ENDPOINT } from "@core/config/app";
import { HTTP_REQUEST } from "@core/libs/api/config";
import { ApiResponse } from "@core/libs/api/types";
import { ProductModel } from "@model/product";

export const productService = {
  get: HTTP_REQUEST.get<ApiResponse<ProductModel[]>>(API_ENDPOINT.products),
  getById: HTTP_REQUEST.get<ApiResponse<ProductModel>>(API_ENDPOINT.products),
  post: HTTP_REQUEST.post<ApiResponse<ProductModel>>(API_ENDPOINT.products),
  put: HTTP_REQUEST.put<ApiResponse<ProductModel>>(API_ENDPOINT.products),
  delete: HTTP_REQUEST.delete<ApiResponse<void>>(API_ENDPOINT.products),
};
