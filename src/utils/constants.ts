export const getEpisodesUrl = (id: number) =>
  `https://api.allorigins.win/get?url=${encodeURIComponent(
    `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode`,
  )}`;
