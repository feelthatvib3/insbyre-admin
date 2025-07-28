export function absoluteUrl(path: string) {
  return `${import.meta.env.VITE_APP_URL}${path}`;
}
