import axios from 'axios';

export const fetchTrailer = async (movieTitle: string) => {
  try {
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
      params: {
        part: 'snippet',
        q: `영화 ${movieTitle} 예고편`,
        key: import.meta.env.VITE_YOUTUBE_API_KEY,
        type: 'video',
        maxResults: 1,
      },
    });
    return response.data.items[0]?.id.videoId;
  } catch (error) {
    console.error('YouTube API Error:', error);
  }
};

export const fetchShorts = async (movieTitle: string) => {
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: `영화 ${movieTitle} 쇼츠`,
        key: import.meta.env.VITE_YOUTUBE_API_KEY,
        type: 'video',
        maxResults: 3,
      },
    });
    return response.data.items.map((item: { id: { videoId: string } }) => item.id.videoId);
  } catch (error) {
    console.error('YouTube API Error:', error);
  }
};
