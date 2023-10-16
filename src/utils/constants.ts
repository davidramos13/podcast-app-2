export const BASEURL = 'https://corsproxy.io';

export const getEncodedUrl = (query: string) =>
  `?${encodeURIComponent(`https://itunes.apple.com/${query}`)}`;
