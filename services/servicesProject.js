import { ApiService } from "./ApiService";
import { API_ENDPOINTS } from "./endpoints";

export const getProjects = async () => {
  return ApiService.fetchDataWithAxios({
    url: API_ENDPOINTS.projects,
    method: "get",
    cacheKey: "projectsCache",
  });
};