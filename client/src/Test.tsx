import { socket } from './socket';

export const Test = () => {
  const handleButtonClick = () => {
    console.log(`${import.meta.env.MODE}`);
    console.log('연결');
    socket.emit('chatMessage', 'gameId', '메시지를 보냅니다');
  };

  return <button onClick={handleButtonClick}>버튼입니다</button>;
};
