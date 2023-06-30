import ChatListElemInfo from './ChatListElemInfo';

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { getChat } from "../../slices/chats"
import { getUser } from "../../slices/users"

import { Loader } from "../loaders/Loader";
import { selectStompUser } from "../../features/controls/websocket/socket-selector";

import { deleteMessage, editMessage, privateFile, privateMessage } from "../../features/controls/demo/demo-slice";

import { setPrivateSubscribeCurrentUser } from "../../features/controls/chat/chats-slice";

import { addChat } from "../../features/controls/demo/demo-slice";



const ChatListElem = ({data}) => {
    
    // let chatInfo;

    const dispatch = useDispatch();
    const stompUser = useSelector(selectStompUser);
    
    const currentUser = localStorage.getItem('current-userId');
       
    const [chat, setChat] = useState('');
    const [loadData, setLoadData] = useState(true);
    const [anotherUser, setAnotherUser] = useState("");
    
    let lastMessage = "";
    // const [visibleChat, handleChat] = useChat();
    let visibleChat = useSelector((state) => state.demo.chat);
    
    const privateSubscribeCurrentUser = useSelector((state) => state.chatControls.privateSubscribeCurrentUser);

    useEffect(() => {
        loadChatData();    
    }, [anotherUser.username, loadData])
        
    // useEffect(() => {

    // }, [visibleChat])


    const loadChatData = async () => {

        await dispatch(getChat(data.chatId))
                .unwrap()
                .then(chatData => {
                    
                    if(chatData.type.name === "private") {

                        let chatTitle = chatData.name.split("&");

                        chatTitle.forEach(async (userId) => {

                            console.log('UserId: ', userId);

                            if(currentUser !== userId) {

                                await fetchUser(userId);

                                if(anotherUser.username) {
                                    
                                    lastMessage = chatData.messages[chatData.messages.length-1];
                                    
                                    console.log('Chat data last message: ', lastMessage);

                                    const chatInfo = {
                                        "id": chatData.id,
                                        "type": chatData.type,
                                        "name": anotherUser.username,
                                        "avatar": anotherUser.avatar,
                                        "online": anotherUser.online,
                                        "anotherUserId": anotherUser.id, 
                                        "lastActive": anotherUser.lastActive,
                                        "messages": chatData.messages,
                                        "lastMessage": lastMessage
                                    }

                                    
                                    await setChat(chatInfo);

                                    console.log('ChatInfo: ', chatInfo);
                                    
                                    if(stompUser && privateSubscribeCurrentUser !== true) {

                                        stompUser.subscribe(`/user/${currentUser}/private`, (payload) => {
                                            dispatch(privateMessage(payload));
                                        });

                                        stompUser.subscribe(`/user/${currentUser}/private-edit`, (payload) => {
                                            console.log('Private Edit payload: ', payload)
                                            dispatch(editMessage(payload));
                                        });

                                        stompUser.subscribe(`/user/${currentUser}/private-delete`, (payload) => {
                                            console.log('PRIVATE DELETE payload: ', payload)
                                            dispatch(deleteMessage(payload));
                                        })

                                        stompUser.subscribe(`/user/${currentUser}/private-file`, (payload) => {
                                            console.log('Private FILE payload: ', payload)
                                            dispatch(privateFile(payload));
                                        })

                                        // stompUser.subscribe(`/user/${currentUser}/online`, onPrivateMessage);
                                        dispatch(setPrivateSubscribeCurrentUser);
                                    }

                                    await dispatch(addChat(chatInfo));

                                    setLoadData(false);
                                    
                                }

                            } 
                        })
                    
                    }

                })
                .catch(e => {
                    console.log(e);
                })

    }

    // Получим другого пользователя
    const fetchUser = async (id) => {

        await dispatch(getUser(id))
                .unwrap()
                .then((data) => {
                    setAnotherUser(data);
                })
                .catch(e => {
                    console.log(e);
                })

    }


    return (loadData === false && chat !== "") ? 
            (
                <ChatListElemInfo key={"clei" + chat.id} chat={chat} />
            ) : <Loader />
}

export default ChatListElem;