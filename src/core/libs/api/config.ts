import { convertObjectToQueryParams } from "../../../libs/helper";
import { ApiOption, MethodTypes, getContentType } from "./types";

const createEndpoint = (endpoint: string, path?: string, queryParams?: Record<string, string | number | null | undefined>) => {
  if (!endpoint) return ''
  let result = endpoint;
  if (path) {
    result = `${endpoint}/${path}`;
  }
  if (queryParams) {
    const query = convertObjectToQueryParams(queryParams)
    result = `${result}${query ? `?${query}` : ''}`
  }
  return result
};

async function createRequest<Res = unknown, Req = unknown>(
  endpoint: string,
  method: MethodTypes,
  apiOption?: ApiOption,
  body?: Req
) {


  const res: Response = await fetch(
    createEndpoint(endpoint as string, apiOption?.path || '', { ...apiOption?.queryParams }),
    {
      method,

      headers: {
        "Content-Type": getContentType(apiOption?.contentType || "json"),
        ...(apiOption?.bearerToken &&
          typeof apiOption.bearerToken !== "undefined" && {
          Authorization: `Bearer ${apiOption.bearerToken}`,
        }),
        ...apiOption?.headers,
      },
      body: JSON.stringify(body),
    }
  );
  const data: Res = await res.json();
  if (!res.ok) {
    throw data;
  }
  return data as Res;
}


export const HTTP_REQUEST = {
  get:
    <Res = unknown, Req = unknown>(endpoint: string) =>
      (apiOption?: ApiOption) =>
        createRequest<Res, Req>(endpoint, "GET", apiOption),
  post:
    <Res = unknown, Req = unknown>(endpoint: string) =>
      (body?: Req, apiOption?: ApiOption) =>
        createRequest<Res, Req>(endpoint, "POST", apiOption, body),
  put:
    <Res = unknown, Req = unknown>(endpoint: string) =>
      (body?: Req, apiOption?: ApiOption) =>
        createRequest<Res, Req>(endpoint, "PUT", apiOption, body),
  patch:
    <Res = unknown, Req = unknown>(endpoint: string) =>
      (body?: Req, apiOption?: ApiOption) =>
        createRequest<Res, Req>(endpoint, "PATCH", apiOption, body),
  delete:
    <Res = unknown, Req = unknown>(endpoint: string) =>
      (apiOption?: ApiOption) =>
        createRequest<Res, Req>(endpoint, "DELETE", apiOption),
};
