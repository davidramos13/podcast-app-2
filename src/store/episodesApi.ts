import axios from 'axios';
import { PodcastFull } from '~/entities/podcast';
import { BASEURL, getEncodedUrl } from '~/utils/constants';
import { ITunesResults, transformITunesResults } from '~/utils/itunes';
import { mapPodcast } from './podcastsApi';

const transformEpisodes = (apiResults: ITunesResults): PodcastFull => {
  const episodeData = transformITunesResults(apiResults);
  const podcastInfo = episodeData.find(data => data.kind === 'podcast')!;

  const podcast = mapPodcast(podcastInfo);
  const podcastFull = {
    ...podcast,
    episodes: episodeData
      .filter(e => e.kind === 'podcast-episode')
      .map(e => ({
        id: e.trackId,
        title: e.trackName,
        releaseDate: e.releaseDate,
        description: e.description,
        duration: (e.trackTimeMillis || 0) / 1000,
        url: e.episodeUrl,
        thumbnailUrl: e.artworkUrl60,
        imageUrl: e.artworkUrl160,
      })),
  };

  return podcastFull;
};

export const fetchEpisodes = async (podcastId: number) => {
  const { data } = await axios.get<ITunesResults>(
    `${BASEURL}${getEncodedUrl(`lookup?id=${podcastId}&entity=podcastEpisode&limit=20`)}`,
  );
  return transformEpisodes(data);
};

export const fetchLastPodcastEpisode = async (podcastId: number) => {
  const { data } = await axios.get<ITunesResults>(
    `${BASEURL}${getEncodedUrl(`lookup?id=${podcastId}&entity=podcastEpisode&limit=1`)}`,
  );
  return transformEpisodes(data);
};
