const CACHE_NAME = "trelea-songs-auth";
const TOKEN_URL = "/auth-token";

/**
 * @description Store the auth token in cache storage
 */
export async function setToken(token: string): Promise<void> {
  try {
    const cache = await caches.open(CACHE_NAME);
    const response = new Response(token);
    await cache.put(new Request(TOKEN_URL), response);
  } catch (error) {
    console.error("Failed to store token:", error);
  }
}

/**
 * @description Get the auth token from cache storage
 */
export async function getToken(): Promise<string | null> {
  try {
    const cache = await caches.open(CACHE_NAME);
    const response = await cache.match(new Request(TOKEN_URL));
    if (response) {
      return await response.text();
    }
    return null;
  } catch (error) {
    console.error("Failed to get token:", error);
    return null;
  }
}

/**
 * @description Remove the auth token from cache storage
 */
export async function removeToken(): Promise<void> {
  try {
    const cache = await caches.open(CACHE_NAME);
    await cache.delete(new Request(TOKEN_URL));
  } catch (error) {
    console.error("Failed to remove token:", error);
  }
}

/**
 * @description Clear all auth cache
 */
export async function clearAuthCache(): Promise<void> {
  try {
    await caches.delete(CACHE_NAME);
  } catch (error) {
    console.error("Failed to clear auth cache:", error);
  }
}
