import { useEffect, useState } from 'react';
import { selectSearch } from "../../../features/controls/controls-selectors";
import { useSelector, useDispatch } from "react-redux";

import { getUser, getAllUsersByUsername } from "../../../slices/users"
import { getChat } from "../../../slices/chats"

import { Loader } from '../../loaders/Loader';

import ChatListElem from "../ChatListElem";
import FilterChatListElem from './FilterChatListElem';
import FilterChatListUser from './FilterChatListUser';


export const FilterChatList = ({userChats}) => {

    const dispatch = useDispatch();
    const search = useSelector(selectSearch);
    
    const regex = new RegExp(search, 'i')

    const currentUser = +localStorage.getItem('current-userId');
    
    const [chat, setChat] = useState();
    
    const [filterChats, setFilterChats] = useState([]);

    const [anotherUser, setAnotherUser] = useState({"avatar": "", "username": "", "online": false});

    const [loadData, setLoadData] = useState(false);


    useEffect(() => {
        
        fetchAllUsers();

    }, [search])
    

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


    // Инфа о чате
    const fetchChat = async (chatId) => {

        await dispatch(getChat(chatId))
            .unwrap()
            .then(chatData => {

                let chatInfo;

                if(chatData.type.name === "private") {

                    let chatTitle = chatData.name.split("&");

                    chatTitle.forEach((userId) => {

                        if(currentUser !== +userId) {
                            console.log('CURR USER: ' + currentUser + ", UserId: " + userId);

                            fetchUser(userId);

                            if(anotherUser.username !== "") {
                                
                                console.log('ANOTHER USER: ', anotherUser);

                                chatInfo = {
                                    "id": chatData.id,
                                    "type": chatData.type,
                                    "name": anotherUser.username,
                                    "avatar": anotherUser.avatar,
                                    "online": anotherUser.online,
                                    "messages": chatData.messages 
                                }

                                if(chatInfo.name.toLocaleLowerCase().search(regex) !== -1) {
                                    setChat(chatInfo);
                                }
                                
                                console.log('Chat ИНФО: ', chatInfo);
                                
                            }

                        } 
                    })
                
                }

            })
            .catch(e => {
                console.log(e);
            })
        
    }


    // Загрузка всех пользователей
    const fetchAllUsers = () => {

        dispatch(getAllUsersByUsername(search))
            .unwrap()
            .then(data => {
                let chats = [];
                let filterChatsCopy = [];
                let filterUsersCopy = [];
                
                userChats.forEach((userChat) => {
                    fetchChat(userChat.chatId)
                    
                    if(anotherUser.username !== "" && chat) {
                        console.log('CHAT: ', chat);
                        
                        chats.push(chat);
                    }
                    
                })
                
                
                if(chats.length > 0) {

                    filterChatsCopy.push({"category": "chats", "data": chats})
                    
                    data.forEach((user) => {

                        if(user.id !== currentUser && chat?.name !== "") {

                            // Если чата с определенным пользователем не было, то тогда 
                            // добавим его в массив "Пользователи" во время поиска
                            let existsChatByUser = chats.find((chat) => user.username === chat.name);
                            
                            if(!existsChatByUser) {
                                filterUsersCopy.push(user);
                            }
    
                        }
                        
                    })

                    console.log('Users copy: ', filterUsersCopy);

                }
            
                if(filterUsersCopy.length > 0) {
                    filterChatsCopy.push({"category": "users", "data": filterUsersCopy})
                }
                
                if(filterChatsCopy) {
                    filterChatsCopy.push({"category": "users", "data": [
                        {"id": 33, 
                            "username": "FieldMortal", 
                            "avatar": "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
                            "online": true
                        },
                        {   "id": 37, 
                            "username": "FieldFrank", 
                            "avatar": "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
                            "online": true
                        },
                        {   "id": 37, 
                            "username": "FieldFrank", 
                            "avatar": "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
                            "online": true
                        },
                        {   "id": 37, 
                            "username": "FieldFrank", 
                            "avatar": "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
                            "online": true
                        },
                        {   "id": 37, 
                            "username": "FieldFrank", 
                            "avatar": "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
                            "online": true
                        },
                        {   "id": 37, 
                            "username": "FieldFrank", 
                            "avatar": "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
                            "online": true
                        },
                        {   "id": 37, 
                            "username": "FieldFrank", 
                            "avatar": "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
                            "online": true
                        }
                    ] })

                    
                    setFilterChats(filterChatsCopy);                    
                    console.log('Filter Chats: ', filterChatsCopy);

                    setChat('');
                    setAnotherUser({"avatar": "", "username": "", "online": false});
                }

            })
            .catch(e => {
                console.log(e);
            })

        setLoadData(true);
    }


    
    return <>
        {
            loadData === true ?
                filterChats.map((elem) => {
                    console.log('ELEM: ', elem)
                    return elem.category === "chats" && elem.data.length > 0 ? 
                        <>
                            <h2 className='chat-list__title'>Chats</h2>
                            {
                                elem.data.map((info) => {
                                    return <FilterChatListElem chat={info} />
                                })
                            }
                        </>
                        :
                        <>
                            <h2 className='chat-list__title'>Users</h2>
                            {
                                elem.data.map((info) => {
                                    return <FilterChatListUser user={info} />
                                })
                            }
                        </> 
                    {/* return <div>{elem.data.name}</div> */}
                    {/* return <ChatListElem key={new Date().getTime()} data={elem} /> */}
                })
                : 
                <Loader />
        }
    </>
}