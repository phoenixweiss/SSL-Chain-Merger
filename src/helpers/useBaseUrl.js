/**
 * useBaseUrl - A helper function to retrieve the base URL from Vite's environment variables.
 *
 * This function provides the base URL defined in the Vite configuration (`vite.config.js`) via
 * `import.meta.env.BASE_URL`. It is useful for ensuring that relative paths in your application
 * are consistent, especially when deploying to GitHub Pages or other hosting services that may
 * use a subdirectory as the root.
 *
 * Example usage:
 * import { useBaseUrl } from './useBaseUrl';
 * const baseUrl = useBaseUrl();
 *
 * @returns {string} The base URL of the project.
 */
export const useBaseUrl = () => import.meta.env.BASE_URL
