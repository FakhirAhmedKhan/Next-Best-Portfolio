import { ApiService } from "./ApiService";
import { API_ENDPOINTS } from "./endpoints";

export const getEducation = async () => {
  return ApiService.fetchDataWithAxios({
    url: API_ENDPOINTS.education,
    method: "get",
    cacheKey: "educationCache",
  });
};