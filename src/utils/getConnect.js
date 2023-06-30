import {over} from 'stompjs';
import SockJS from 'sockjs-client';


// Подключение пользователя по WebSocket
export const getConnect = () => {
    const Sock = new SockJS(`http://localhost:6060/ws?token=${localStorage.getItem('auth_token')}`);

    // stompClient = over(Sock);

    let headers = {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`
    }

    // stompClient.connect(headers, onConnected);
}