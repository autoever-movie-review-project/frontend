import axios from 'axios';
import { useState, useEffect } from 'react';

interface YoutubeVideo {
  id: {
    videoId: string;
  };
}

interface YoutubeResponse {
  items: YoutubeVideo[];
}

interface UseYoutubeResult {
  trailerId: string;
  shorts: string[];
  error: string | null;
  isLoading: boolean;
}

class YoutubeApi {
  private readonly API_KEY = AIzaSyCosbtp7PjdFEK3dEUD78_qph5YcKS8tl4;
  private readonly BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

  private async searchVideos(query: string, maxResults: number): Promise<string[]> {
    try {
      const response = await axios.get<YoutubeResponse>(this.BASE_URL, {
        params: {
          part: 'snippet',
          q: query,
          key: this.API_KEY,
          type: 'video',
          maxResults,
        },
      });

      return response.data.items.map((item) => item.id.videoId);
    } catch (error) {
      console.error('YouTube API Error:', error);
      throw error;
    }
  }

  async getMovieTrailer(movieTitle: string): Promise<string> {
    if (!movieTitle) return '';

    const videos = await this.searchVideos(`영화 ${movieTitle} 예고편`, 1);
    return videos[0] || '';
  }

  async getMovieShorts(movieTitle: string): Promise<string[]> {
    if (!movieTitle) return [];

    return await this.searchVideos(`영화 ${movieTitle} 쇼츠`, 3);
  }

  useYoutube(movieTitle: string): UseYoutubeResult {
    const [trailerId, setTrailerId] = useState<string>('');
    const [shorts, setShorts] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
      const fetchYouTubeData = async () => {
        if (!movieTitle) return;

        setIsLoading(true);
        setError(null);

        try {
          const [trailerResult, shortsResult] = await Promise.all([
            this.getMovieTrailer(movieTitle),
            this.getMovieShorts(movieTitle),
          ]);

          setTrailerId(trailerResult);
          setShorts(shortsResult);
        } catch (error) {
          console.error('YouTube fetch error:', error);
          setError('Failed to fetch YouTube data');
        } finally {
          setIsLoading(false);
        }
      };

      fetchYouTubeData();
    }, [movieTitle]);

    return { trailerId, shorts, error, isLoading };
  }
}

export const youtubeApi = new YoutubeApi();
