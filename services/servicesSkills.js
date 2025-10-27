import { ApiService } from "./ApiService";
import { API_ENDPOINTS } from "./endpoints";

export const getSkills = async () => {
  return ApiService.fetchDataWithAxios({
    url: API_ENDPOINTS.skills,
    method: "get",
    cacheKey: "skillsIconsCache",
  });
};