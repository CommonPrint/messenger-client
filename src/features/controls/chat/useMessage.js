import { useDispatch, useSelector } from "react-redux"

import { selectMessages } from "../controls-selectors";
import { setMessages } from "./chats-slice"


export const useMessage = () => {

    const dispatch = useDispatch();
    const visibleMessages = useSelector(selectMessages);

    const handleMessages = (data) => {
        dispatch(setMessages(data))
    }

    return [visibleMessages, handleMessages];

}