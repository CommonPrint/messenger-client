import { useDispatch, useSelector } from "react-redux"

import { selectMessagesChat } from "./demo-selector";
import { messagesUpdate } from "./demo-slice";

export const useDemo = () => {

    const dispatch = useDispatch();
    const messages = useSelector(selectMessagesChat);

    const handleMessages = (data) => {
        dispatch(messagesUpdate(data));
        console.log('DATA messages from handle: ', data);
    }

    return [messages, handleMessages];

}