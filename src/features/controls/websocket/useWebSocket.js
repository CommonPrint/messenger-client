import { useDispatch, useSelector } from "react-redux"

import { selectStompUser } from "./socket-selector";
import { setStomp } from "./socket-slice"

export const useWebSocket = () => {

    const dispatch = useDispatch();
    const stompUser = useSelector(selectStompUser);

    const handleStomp = (data) => {
        dispatch(setStomp(data));
    }

    return [stompUser, handleStomp];

}