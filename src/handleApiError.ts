import axios, { AxiosError } from "axios";

interface ApiError {
  type: string;
  title: string;
  status: number;
  instance: string;
}

export const handleApiError = (error: Error) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    const apiError = axiosError.response?.data as ApiError | undefined;

    if (apiError) {
      return apiError.title;
    }
  } else return "Erro desconhecido";
};
