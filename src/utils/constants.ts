export const BASEURL = 'https://api.allorigins.win';

export const getEncodedUrl = (query: string) =>
  `https://api.allorigins.win/get?url=${encodeURIComponent(`https://itunes.apple.com/${query}`)}`;

// lookup?id=${id}&entity=podcastEpisode
