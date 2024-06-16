export interface ApiOption {
  contentType?: "json" | "form-data" | "url-encoded";
  bearerToken?: string;
  headers?: HeadersInit;
  path?: string;
}

export interface ApiResponse<Res = unknown> {
  massege?:string,
  status?:string,
  message?:string,
  Anggota?:Res,
  Angkatan?:Res,
  Pengurus?:Res
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
