export const BASEURL = import.meta.env.VITE_BASE_PROXY_URL;

export const getEncodedUrl = (query: string) =>
  `?${encodeURIComponent(`https://itunes.apple.com/${query}`)}`;
