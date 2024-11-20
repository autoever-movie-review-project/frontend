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

interface KeyStatus {
  key: string;
  failureCount: number;
  lastFailure: number;
  isBlocked: boolean;
}

class YoutubeApi {
  private API_KEYS = [
    'AIzaSyB9x5xGwcpavkFmc1YHbxRdWixi3MaLSc8',
    'AIzaSyCosbtp7PjdFEK3dEUD78_qph5YcKS8tl4',
    'AIzaSyCCxP4bquKJhm9M1JjwVDf9cStUAwTyJ9g',
  ].filter(Boolean);

  private currentKeyIndex = 0;
  private readonly BASE_URL = 'https://www.googleapis.com/youtube/v3/search';
  private cache: Map<string, { data: string[]; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 1000 * 60 * 60; // 1시간
  private keyStatuses: KeyStatus[] = [];
  private readonly BLOCK_DURATION = 1000 * 60 * 60; // 1시간
  private readonly MAX_FAILURES = 3;

  constructor() {
    if (this.API_KEYS.length === 0) {
      throw new Error('No valid YouTube API keys found');
    }
    this.keyStatuses = this.API_KEYS.map((key) => ({
      key,
      failureCount: 0,
      lastFailure: 0,
      isBlocked: false,
    }));
  }

  private getCurrentKey(): string {
    return this.API_KEYS[this.currentKeyIndex];
  }

  private rotateKey(): string {
    this.currentKeyIndex = (this.currentKeyIndex + 1) % this.API_KEYS.length;
    return this.getCurrentKey();
  }

  private getNextValidKey(): KeyStatus | null {
    const now = Date.now();
    return (
      this.keyStatuses.find((status) => {
        if (status.isBlocked && now - status.lastFailure > this.BLOCK_DURATION) {
          status.isBlocked = false;
          status.failureCount = 0;
        }
        return !status.isBlocked;
      }) || null
    );
  }

  private handleKeyFailure(keyStatus: KeyStatus) {
    keyStatus.failureCount++;
    keyStatus.lastFailure = Date.now();

    if (keyStatus.failureCount >= this.MAX_FAILURES) {
      keyStatus.isBlocked = true;
      console.warn(`API key has been blocked for ${this.BLOCK_DURATION / 1000} seconds`);
    }
  }

  private async searchVideos(query: string, maxResults: number): Promise<string[]> {
    const cacheKey = `${query}-${maxResults}`;
    const cached = this.cache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }

    let attempts = 0;
    const maxAttempts = this.API_KEYS.length;

    while (attempts < maxAttempts) {
      const validKey = this.getNextValidKey();
      if (!validKey) {
        throw new Error('No valid API keys available. Please try again later.');
      }

      try {
        const response = await axios.get<YoutubeResponse>(this.BASE_URL, {
          params: {
            part: 'snippet',
            q: query,
            key: validKey.key,
            type: 'video',
            maxResults,
          },
        });

        const results = response.data.items.map((item) => item.id.videoId);
        this.cache.set(cacheKey, { data: results, timestamp: Date.now() });

        return results;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 403) {
          console.warn(`API key ${this.currentKeyIndex + 1} failed, trying next key...`);
          this.handleKeyFailure(validKey);
          this.rotateKey();
          attempts++;

          if (attempts === maxAttempts) {
            throw new Error('All API keys have been exhausted. Please try again later.');
          }

          await new Promise((resolve) => setTimeout(resolve, 1000));
          continue;
        }
        throw error;
      }
    }

    throw new Error('Unable to fetch YouTube data after trying all available API keys');
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
