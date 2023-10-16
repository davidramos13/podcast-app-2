import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { EpisodeGroup } from '~/entities/episode';
import { BASEURL, getEncodedUrl } from '~/utils/constants';
import { ITunesResultsRaw, transformITunesResults } from '~/utils/itunes';
import { mapPodcast } from './podcastsApi';

const transformEpisodes = (apiResults: ITunesResultsRaw): EpisodeGroup => {
  const episodeData = transformITunesResults(apiResults);
  const podcastInfo = episodeData.find(data => data.kind === 'podcast')!;

  const podcast = mapPodcast(podcastInfo);
  const episodes = episodeData
    .filter(e => e.kind === 'podcast-episode')
    .map(e => ({
      id: e.trackId,
      title: e.trackName,
      releaseDate: e.releaseDate,
      description: e.description,
      duration: e.trackTimeMillis,
      url: e.episodeUrl,
      thumbnailUrl: e.artworkUrl60,
      imageUrl: e.artworkUrl160,
    }));

  return { podcast, episodes };
};

const episodesApi = createApi({
  reducerPath: 'episodes',
  baseQuery: fetchBaseQuery({ baseUrl: BASEURL }),
  endpoints: builder => ({
    getEpisodes: builder.query({
      query: (podcastId: number) => ({
        url: getEncodedUrl(`lookup?id=${podcastId}&entity=podcastEpisode&limit=20`),
        method: 'GET',
      }),
      transformResponse: transformEpisodes,
    }),
    getLastPodcastEpisode: builder.query({
      query: (podcastId: number) => ({
        url: getEncodedUrl(`lookup?id=${podcastId}&entity=podcastEpisode&limit=1`),
        method: 'GET',
      }),
      transformResponse: (apiResults: ITunesResultsRaw) => {
        const { podcast, episodes } = transformEpisodes(apiResults);
        return { podcast, episode: episodes[0] };
      },
    }),
  }),
});

export const { useGetEpisodesQuery, useLazyGetLastPodcastEpisodeQuery } = episodesApi;

export default episodesApi;
