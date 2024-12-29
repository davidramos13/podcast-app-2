import axios from 'axios';
import { Podcast } from '~/entities';
import { BASEURL, getEncodedUrl } from '~/utils/constants';
import { ITunesResult, ITunesResults, transformITunesResults } from '~/utils/itunes';

export const mapPodcast = (p: ITunesResult) => ({
  id: p.trackId,
  name: p.trackName,
  author: p.artistName,
  genres: p.genres.join(', '),
  releaseDate: p.releaseDate,
  thumbnailUrl: p.artworkUrl60,
});

export const fetchPodcasts = async (term: string): Promise<Podcast[]> => {
  const { data } = await axios.get<ITunesResults>(
    `${BASEURL}${getEncodedUrl(`search?entity=podcast&limit=10&term=${term}`)}`,
  );
  const podcasts = transformITunesResults(data);
  return podcasts.map(mapPodcast);
};
