import { io } from 'socket.io-client';

const URL = `${import.meta.env.MODE}` === 'development' ? 'http://localhost:5000' : 'https://www.autoever.store';

export const socket = io(URL);
