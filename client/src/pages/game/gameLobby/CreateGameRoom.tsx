import Input from 'components/Input';
import * as S from './CreateGameRoom.style';
import Button from 'components/Button';
import { useCreateRoomMutation } from 'hooks/useGame';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { socket } from 'socket';

export const CreateGameRoom = ({ closeModal }: { closeModal: () => void }) => {
  const [roomTitle, setRoomTitle] = useState('');
  const [maxPlayer, setMaxPlayer] = useState(2);
  const createRoomMutation = useCreateRoomMutation();
  const navigate = useNavigate();

  const handleDownButtonClick = () => {
    if (2 >= maxPlayer) return;

    setMaxPlayer((prevMaxPlayer) => prevMaxPlayer - 1);
  };

  const handleUpButtonClick = () => {
    if (8 <= maxPlayer) return;

    setMaxPlayer((prevMaxPlayer) => prevMaxPlayer + 1);
  };

  const handleRoomTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomTitle(e.target.value);
  };

  const handleCreateRoomClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createRoomMutation.mutate(
      { title: roomTitle, maxPlayer },
      {
        onSuccess: (data) => {
          const gameId = data.data.gameId;
          socket.emit('gameRoomUpdate');
          navigate(`/gameroom/${gameId}`);
        },
      }
    );
  };

  return (
    <S.CreateGameRoomForm onSubmit={handleCreateRoomClick}>
      <S.CreateGameInfoWrapper>
        <S.Title>방이름</S.Title>
        <Input value={roomTitle} onChange={handleRoomTitleChange}></Input>
        <S.Title>방인원</S.Title>
        <S.StepperWrapper>
          <S.StepperDownButton onClick={handleDownButtonClick} $Number={maxPlayer}>
            -
          </S.StepperDownButton>
          <S.StepperNumber value={maxPlayer} readOnly></S.StepperNumber>
          <S.StepperUpButton onClick={handleUpButtonClick} $Number={maxPlayer}>
            +
          </S.StepperUpButton>
        </S.StepperWrapper>
      </S.CreateGameInfoWrapper>
      <Button type="submit" text="방 생성하기" width="100%" height="48px;"></Button>
    </S.CreateGameRoomForm>
  );
};
