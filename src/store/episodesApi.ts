import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Episode } from '~/entities';
import { BASEURL, getEncodedUrl } from '~/utils/constants';
import { ITunesResultsRaw, transformITunesResults } from '~/utils/itunes';

const transformEpisodes = (apiResults: ITunesResultsRaw): Episode[] => {
  const episodes = transformITunesResults(apiResults);
  return episodes
    .filter(e => e.kind === 'podcast-episode')
    .map(e => ({
      id: e.trackId,
      collectionName: e.collectionName,
      artistName: e.artistName,
      title: e.trackName,
      releaseDate: e.releaseDate,
      description: e.description,
      duration: e.trackTimeMillis,
      url: e.episodeUrl,
      thumbnailUrl: e.artworkUrl60,
      imageUrl: e.artworkUrl160,
    }));
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
        const episodes = transformEpisodes(apiResults);
        return episodes[0];
      },
    }),
  }),
});

export const { useGetEpisodesQuery, useLazyGetLastPodcastEpisodeQuery } = episodesApi;

export default episodesApi;
