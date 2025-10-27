import { ApiService } from "./ApiService";
import { API_ENDPOINTS } from "./endpoints";

export const getSocialLinks = async () => {
  return ApiService.fetchDataWithAxios({
    url: API_ENDPOINTS.socialLinks,
    method: "get",
    cacheKey: "socialLinksCache",
  });
};