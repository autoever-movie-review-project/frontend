import * as S from './GameLobby.style';
import bgImg from 'assets/gamebg.png';
import gametitle from 'assets/gametitle.svg';
import { GameRoomList } from './GameRoomList';
import { useJoinRandomRoomMutation } from 'hooks/useGame';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { socket } from 'socket';
import { useModal } from 'hooks/useModal';
import { Modal } from 'components/Modal/Modal';
import { CreateGameRoom } from './CreateGameRoom';
import { useNavigate } from 'react-router-dom';

export const GameLobby = () => {
  const joinRandomRoomMutation = useJoinRandomRoomMutation();
  const queryClient = useQueryClient();
  const { isModalOpen, openModal, closeModal } = useModal();
  const navigate = useNavigate();

  useEffect(() => {
    const handleGameRoomUpdate = () => {
      queryClient.invalidateQueries({ queryKey: ['gameRoomList'] });
    };

    // gameRooomUpdate가 되면 게임방 리스트 새로 가져오기
    socket.on('gameRoomUpdate', handleGameRoomUpdate);

    return () => {
      socket.off('gameRoomUpdate', handleGameRoomUpdate);
    };
  }, []);

  const handleJoinRandomRoomClick = () => {
    joinRandomRoomMutation.mutate(undefined, {
      onSuccess: (data) => {
        const gameId = data.data.gameId;
        socket.emit('gameRoomUpdate');
        navigate(`/gameroom/${gameId}`);
      },
    });
  };

  return (
    <S.GameLobbyWrapper $bgImg={bgImg}>
      <S.GameLobbyContainer>
        <S.GameLobbyHeader>
          <S.GameLobbyTitle src={gametitle} />
          <S.HeaderButtonWrapper>
            <S.QuickJoinButton onClick={handleJoinRandomRoomClick}>빠른입장</S.QuickJoinButton>
            <S.CreateRoomButton onClick={openModal}>방만들기</S.CreateRoomButton>
          </S.HeaderButtonWrapper>
        </S.GameLobbyHeader>

        <GameRoomList />
      </S.GameLobbyContainer>
      {isModalOpen && (
        <Modal closeModal={closeModal} width={'400px'}>
          <CreateGameRoom closeModal={closeModal} />
        </Modal>
      )}
    </S.GameLobbyWrapper>
  );
};
