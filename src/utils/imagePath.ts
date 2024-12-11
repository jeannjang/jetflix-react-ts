import { API_CONFIG } from "../api/configApi";

export function makeImagePath(path: string, format: string = "original") {
  if (!path) return "/no-image.jpg";
  return `${API_CONFIG.IMAGE_BASE_URL}/${format}${path}`;
}
