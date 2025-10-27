// /app/service/ApiService.js
import axios from "axios";

const isBrowser = typeof window !== "undefined";

export const ApiService = {
  /**
   * 🔹 Get from localStorage (with optional expiry)
   */
  getCache(key) {
    if (!isBrowser) return null;
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;

      const parsed = JSON.parse(item);
      if (parsed.expiry && Date.now() > parsed.expiry) {
        localStorage.removeItem(key);
        return null;
      }
      return parsed.data;
    } catch {
      return null;
    }
  },

  /**
   * 🔹 Save to localStorage (with expiry)
   * @param {string} key
   * @param {any} data
   * @param {number} ttl - time to live in ms (default 1 hour)
   */
  setCache(key, data, ttl = 3600_000) {
    if (!isBrowser) return;
    try {
      const expiry = Date.now() + ttl;
      const item = JSON.stringify({ data, expiry });
      localStorage.setItem(key, item);
    } catch (err) {
      console.warn(`⚠️ Failed to save ${key} to cache:`, err);
    }
  },

  /**
   * 🔹 Main Axios Fetcher (with caching)
   */
  async fetchDataWithAxios({ url, method = "get", data = null, headers = {}, cacheKey = null, ttl = 3600_000 }) {
    // Check localStorage cache
    if (cacheKey) {
      const cached = this.getCache(cacheKey);
      if (cached) {
        console.log(`📦 Loaded from cache: ${cacheKey}`);
        return cached;
      }
    }

    try {
      const response = await axios({
        url,
        method,
        data,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      });

      const jsonData = response.data;

      // Save to cache if applicable
      if (cacheKey && jsonData) {
        this.setCache(cacheKey, jsonData, ttl);
      }

      return jsonData;
    } catch (error) {
      console.error("❌ ApiService Error:", error.message || error);
      // Fallback to cache if available
      if (cacheKey) {
        const fallback = this.getCache(cacheKey);
        if (fallback) {
          console.warn(`⚠️ Using cached fallback for ${cacheKey}`);
          return fallback;
        }
      }
      throw error;
    }
  },

  // 🔹 Helper shortcuts
  async get(url, cacheKey, ttl) {
    return this.fetchDataWithAxios({ url, method: "get", cacheKey, ttl });
  },
  async post(url, data) {
    return this.fetchDataWithAxios({ url, method: "post", data });
  },
};