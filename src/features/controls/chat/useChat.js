import { useDispatch, useSelector } from "react-redux"

import { selectChat } from "../controls-selectors";
import { setChat, setMessages } from "./chats-slice"
import { selectorChat } from "../demo/demo-slice";

export const useChat = () => {

    const dispatch = useDispatch();
    const visibleChat = useSelector((state) => state.demo.chat);

    const handleChat = async (data) => {
        // await dispatch(setChat(data));
        // await dispatch(setMessages(data.messages));
        await dispatch(selectorChat(data.id));
    }

    return [visibleChat, handleChat];

}