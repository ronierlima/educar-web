import axios, { AxiosError, AxiosResponse } from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.request.use((request) => {
  const token = localStorage.getItem("educar@token");

  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  
  return request;
});

interface ApiError {
  type: string;
  title: string;
  status: number;
  instance: string;
}

export const ApiService = {
  async get(endpoint: string): Promise<AxiosResponse | void> {
    return makeRequest("get", endpoint);
  },

  async post(endpoint: string, data: unknown): Promise<AxiosResponse | void> {
    return makeRequest("post", endpoint, data);
  },

  async put(endpoint: string, data: unknown): Promise<AxiosResponse | void> {
    return makeRequest("put", endpoint, data);
  },

  async delete(endpoint: string): Promise<AxiosResponse | void> {
    return makeRequest("delete", endpoint);
  },
};

async function makeRequest(
  method: "get" | "post" | "put" | "delete",
  endpoint: string,
  data?: unknown
): Promise<AxiosResponse | void> {
  try {
    let response;

    if (method === "get") {
      response = await api.get(endpoint);
    } else if (method === "post") {
      response = await api.post(endpoint, data);
    } else if (method === "put") {
      response = await api.put(endpoint, data);
    } else if (method === "delete") {
      response = await api.delete(endpoint);
    }

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const apiError = axiosError.response?.data as ApiError | undefined;

      if (apiError) {
        throw new Error(apiError.title);
      }
    } else throw new Error("Erro desconhecido");
  }
}
