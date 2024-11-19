import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { client } from 'api/client';

interface IGameRoomInfo {
  createdAt: string;
  id: number;
  hostId: number;
  title: string;
  status: 'WAITING' | 'PLAYING';
  maxPlayer: number;
  playerCount: number;
}

interface IGameRoomListResponse {
  content: IGameRoomInfo[];
}

interface IPlayerInfo {
  rankId: number;
  rankName: string;
  rankImg: string;
  profile: string;
  userId: number;
}

interface IGameRoomDetailResponse {
  gameId: number;
  hostId: number;
  title: string;
  status: 'WAITING' | 'PLAYING';
  maxPlayer: number;
  playerCount: number;
  playerInfo: IPlayerInfo[];
}

interface ICreateGameRoomInfo {
  title: string;
  maxPlayer: number;
}

interface ICreateGameRoomResponse {
  gameId: number;
  hostId: number;
  title: string;
  status: string;
  maxPlayer: number;
  playerCount: number;
}

export interface IReadyResponse {
  userId: number;
  isReady: boolean;
}

// 게임방 리스트 조회
export const useGameRoomListQuery = () => {
  return useQuery({
    queryKey: ['gameRoomList'],
    queryFn: async () => {
      const response = await client.get<IGameRoomListResponse>('/games/?page=0');
      return response.data;
    },
  });
};

// 게임방 상세 조회
export const useGameRoomDetailQuery = (gameId: number) => {
  return useQuery({
    queryKey: ['gameRoomDetail', gameId],
    queryFn: async () => {
      const response = await client.get<IGameRoomDetailResponse>(`/game/${gameId}`);
      return response.data;
    },
  });
};

// 게임방 생성
export const useCreateRoomMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICreateGameRoomInfo) => client.post<ICreateGameRoomResponse>('/game', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gameRoomList'] });
    },
  });
};

// 게임방 참여
export const useJoinGameRoomMutation = () =>
  useMutation({
    mutationFn: (gameId: number) => client.post(`game/${gameId}/join`),
  });

// 게임방 랜덤 참여
export const useJoinRandomRoomMutation = () =>
  useMutation({
    mutationFn: () => client.post<{ gameId: number }>('/game/fastjoin'),
  });

// 게임방 나가기
export const useExitGameRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (gameId: number) => client.delete(`/game/${gameId}/exit`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gameRoomList'] });
    },
  });
};

// 게임 시작
export const useGameStartMutation = () =>
  useMutation({
    mutationFn: (gameId: number) => client.post(`/game/${gameId}/start`),
  });

// 게임 준비
export const useGameReadyMutation = () =>
  useMutation({
    mutationFn: (gameId: number) => client.post<IReadyResponse[]>(`/game/${gameId}/ready`),
  });
