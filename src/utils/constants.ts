export const PODCASTS_URL = 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';

export const getEpisodesUrl = (id: number) =>
  `https://api.allorigins.win/get?url=${encodeURIComponent(
    `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode`,
  )}`;
