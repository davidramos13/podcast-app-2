import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
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

const episodesApi = createApi({
  reducerPath: 'episodes',
  baseQuery: fetchBaseQuery({ baseUrl: BASEURL }),
  tagTypes: ['Podcast'],
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
      providesTags: (_1, _2, podcastId) => [{ type: 'Podcast', id: podcastId }],
      transformResponse: (apiResults: ITunesResults) => transformEpisodes(apiResults),
    }),
  }),
});

export const { useGetEpisodesQuery, useLazyGetLastPodcastEpisodeQuery } = episodesApi;

export default episodesApi;
