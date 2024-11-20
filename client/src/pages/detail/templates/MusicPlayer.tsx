import { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import VolumeOff from 'assets/volume-off.svg?react';
import VolumeOn from 'assets/volume-2.svg?react';
import Play from 'assets/play.svg?react';
import Pause from 'assets/pause.svg?react';
import { theme } from 'styles/theme';

const PlayerContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px 20px 0 20px;
  background: rgba(0, 0, 0, 0.9);
  color: white;
  z-index: 1000;
`;

const CustomPlayer = styled.div`
  position: relative;
  overflow: hidden;
  height: 60px;

  iframe {
    position: absolute;
    top: -60px;
    left: 0;
    width: 100%;
    height: calc(100% + 120px);
    pointer-events: none;
  }
`;

const CustomControls = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 10px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.5));
`;

const PlayButton = styled.button<{ isPlaying: boolean }>`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  opacity: 0.8;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  svg {
    width: 24px;
    height: 24px;
    color: ${theme.colors.text};
  }
`;

const Progress = styled.div`
  flex-grow: 1;
  height: 6px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  cursor: pointer;
  position: relative;
  transition: 0.2s ease-in-out;

  &:hover {
    height: 8px;
  }
`;

const ProgressBar = styled.div<{ width: number }>`
  height: 100%;
  background: ${theme.colors.primary};
  border-radius: 2px;
  width: ${(props) => props.width}%;
  transition: width 0.1s linear;
`;

const TimeDisplay = styled.div`
  font-size: 14px;
  min-width: 100px;
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  z-index: 1;
`;

const VolumeButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  opacity: 0.8;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  svg {
    width: 24px;
    height: 24px;
    color: ${theme.colors.text};
  }
`;

const Volume = styled.input`
  width: 100px;
  cursor: pointer;
  -webkit-appearance: none;
  background: ${theme.colors.grayDark};
  height: 4px;
  border-radius: 2px;
  z-index: 1;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px;
    height: 12px;
    background: ${theme.colors.primary};
    border-radius: 50%;
  }

  &:hover {
    &::-webkit-slider-thumb {
      transform: scale(1.2);
    }
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.2s;
  padding: 8px;

  &:hover {
    opacity: 0.9;
  }
`;

type MoviePlayerProps = {
  movieTitle: string;
  onClose: () => void;
};

type YouTubePlayer = {
  destroy: () => void;
  loadVideoById: (videoId: string) => void;
  setVolume: (volume: number) => void;
  playVideo: () => void;
  pauseVideo: () => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  mute: () => void;
  unMute: () => void;
};

interface YouTubeEvent {
  target: YouTubePlayer;
  data: number;
}

interface YT {
  Player: new (
    elementId: string,
    config: {
      height: string | number;
      width: string | number;
      playerVars: {
        autoplay: number;
        controls: number;
        modestbranding: number;
        enablejsapi: number;
        origin: string;
        playsinline: number;
      };
      events: {
        onReady: (event: YouTubeEvent) => void;
        onStateChange: (event: YouTubeEvent) => void;
        onError: () => void;
      };
    }
  ) => YouTubePlayer;
  PlayerState: {
    PLAYING: number;
  };
}

type PlayerState = {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  isMuted: boolean;
};

declare global {
  interface Window {
    YT: YT;
    onYouTubeIframeAPIReady: () => void;
  }
}

const searchOST = async (movieTitle: string) => {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
      `${movieTitle} OST main theme`
    )}&type=video&key=AIzaSyCCxP4bquKJhm9M1JjwVDf9cStUAwTyJ9g`
  );
  const data = await response.json();
  return data.items?.[0]?.id?.videoId;
};

function MoviePlayer({ movieTitle, onClose }: MoviePlayerProps) {
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);
  const [playerState, setPlayerState] = useState<PlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    isMuted: false,
  });
  const progressRef = useRef<HTMLDivElement>(null);
  const playerInitialized = useRef(false);

  // 플레이어 준비 핸들러
  const handlePlayerReady = useCallback((event: YouTubeEvent) => {
    event.target.setVolume(30);
    setPlayerState((prev) => ({
      ...prev,
      duration: event.target.getDuration(),
    }));
  }, []);

  // 플레이어 상태 변경 핸들러
  const handlePlayerStateChange = useCallback((event: YouTubeEvent) => {
    setPlayerState((prev) => ({
      ...prev,
      isPlaying: event.data === window.YT.PlayerState.PLAYING,
    }));
  }, []);

  // 재생/일시정지 토글
  const togglePlay = useCallback(() => {
    if (playerState.isPlaying) {
      player?.pauseVideo();
    } else {
      player?.playVideo();
    }
  }, [player, playerState.isPlaying]);

  // 음소거 토글
  const toggleMute = useCallback(() => {
    if (playerState.isMuted) {
      player?.unMute();
    } else {
      player?.mute();
    }
    setPlayerState((prev) => ({ ...prev, isMuted: !prev.isMuted }));
  }, [player, playerState.isMuted]);

  // 프로그레스바 클릭 핸들러
  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!progressRef.current || !player) return;

      const rect = progressRef.current.getBoundingClientRect();
      const ratio = (e.clientX - rect.left) / rect.width;
      const newTime = ratio * playerState.duration;

      player.seekTo(newTime, true);
      setPlayerState((prev) => ({ ...prev, currentTime: newTime }));
    },
    [player, playerState.duration]
  );

  // 볼륨 변경 핸들러
  const handleVolumeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const volume = Number(e.target.value);
      player?.setVolume(volume);
    },
    [player]
  );

  // 시간 포맷팅 유틸리티
  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // YouTube API 초기화
  const initPlayer = useCallback(() => {
    if (playerInitialized.current) return;

    const newPlayer = new window.YT.Player('youtube-player', {
      height: '80',
      width: '100%',
      playerVars: {
        autoplay: 1,
        controls: 0,
        modestbranding: 1,
        enablejsapi: 1,
        origin: window.location.origin,
        playsinline: 1,
      },
      events: {
        onReady: handlePlayerReady,
        onStateChange: handlePlayerStateChange,
        onError: () => toast.error('재생 중 오류가 발생했어요.'),
      },
    });

    setPlayer(newPlayer);
    playerInitialized.current = true;
  }, [handlePlayerReady, handlePlayerStateChange]);

  useEffect(() => {
    const existingScript = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');

    if (!existingScript) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    if (window.YT) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      if (player?.destroy) {
        player.destroy();
        playerInitialized.current = false;
      }
    };
  }, [initPlayer, player]);

  const loadOST = useCallback(async () => {
    if (!player || !movieTitle) return;

    try {
      const videoId = await searchOST(movieTitle);
      if (videoId) {
        player.loadVideoById(videoId);
        toast('🎵 OST 재생 중...');
      } else {
        toast.error('OST를 찾지 못했어요.');
      }
    } catch (error) {
      console.error('Failed to load OST:', error);
      toast.error('OST 재생에 실패했어요.');
    }
  }, [player, movieTitle]);

  useEffect(() => {
    loadOST();
  }, [loadOST]);

  // 시간 업데이트 인터벌
  useEffect(() => {
    let timeUpdateInterval: number | Timeout;

    if (player && playerState.isPlaying) {
      timeUpdateInterval = setInterval(() => {
        setPlayerState((prev) => ({
          ...prev,
          currentTime: player.getCurrentTime(),
          duration: player.getDuration(),
        }));
      }, 1000);
    }

    return () => {
      if (timeUpdateInterval) {
        clearInterval(timeUpdateInterval);
      }
    };
  }, [player, playerState.isPlaying]);

  return (
    <PlayerContainer>
      <CustomPlayer>
        <div id="youtube-player" />
        <CustomControls>
          <PlayButton isPlaying={playerState.isPlaying} onClick={togglePlay}>
            {playerState.isPlaying ? <Pause /> : <Play />}
          </PlayButton>
          <Progress ref={progressRef} onClick={handleProgressClick}>
            <ProgressBar width={(playerState.currentTime / playerState.duration) * 100} />
          </Progress>
          <TimeDisplay>
            {formatTime(playerState.currentTime)} / {formatTime(playerState.duration)}
          </TimeDisplay>
          <VolumeButton onClick={toggleMute}>{playerState.isMuted ? <VolumeOff /> : <VolumeOn />}</VolumeButton>
          <Volume type="range" min="0" max="100" defaultValue="30" onChange={handleVolumeChange} />
          <CloseButton onClick={onClose}>✕</CloseButton>
        </CustomControls>
      </CustomPlayer>
    </PlayerContainer>
  );
}

export default MoviePlayer;
