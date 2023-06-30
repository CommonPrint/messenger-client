import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';

import { Header } from '../components/Header';
import { DropDown } from '../components/DropDown';

import { ChatList } from '../components/chat/ChatList';
import { FilterChatList } from '../components/chat/filter/FilterChatList';
import { Loader } from '../components/loaders/Loader';

import { Controls } from '../features/controls/Controls';
import { ChatControls } from '../features/controls/chat/ChatControls';


import { getToken } from '../utils/getToken';

import { getUser } from "../slices/users"

import {over} from 'stompjs';
import SockJS from 'sockjs-client';

import { selectSearch } from "../features/controls/controls-selectors"; 
import { useWebSocket } from '../features/controls/websocket/useWebSocket';


let stompClient = null;


export const MainPage = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const token = getToken();
    
    const search = useSelector(selectSearch);
    
    const chat = useSelector((state) => state.demo.chat)

    const [loadData, setLoadData] = useState(true);

    const [stompUser, handleStomp] = useWebSocket();

    const [currentUser, setCurrentUser] = useState("");
    // const [anotherUser, setAnotherUser] = useState("");
    

    useEffect(() => {

        (async () => {

            let currTime = new Date().getTime();

            if(+localStorage.getItem('token-life-time') > currTime) {

                if(localStorage.getItem("current-userId") && token !== '') {
        
                    let id = +localStorage.getItem("current-userId");   
                    
                    if(id) {
                        await fetchUser(id, "current");
                    }
                    
                }
                
                else {
                    navigate('/login');
                }

            }
            else {
                localStorage.removeItem("current-userId");
                localStorage.removeItem("authorization");
                localStorage.removeItem("token-life-time");

                navigate('/login');
            }

        })()

    }, [loadData, currentUser.username])


    // Получим текущего пользователя
    const fetchUser = async (id, userType) => {
        
        await dispatch(getUser(id))
                .unwrap()
                .then(data => {
                    
                    if(userType === "current") {
                        setCurrentUser(data);

                        const Sock = new SockJS(`http://localhost:6800/ws?token=${token}`);

                        stompClient = over(Sock);

                        // let headers = {
                        //     Authorization: `Bearer ${token}`
                        // }

                        // stompClient.connect(headers, () => {
                        //     dispatch(connectUserOnline({
                        //         id: data.id,
                        //         online: true,
                        //         lastActive: null
                        //     }))
                        // });

                        if(Sock) {
                            handleStomp(stompClient);
                        }

                        if(stompUser) {
                            setLoadData(false);
                        }
                    }

                    else {
                        // setAnotherUser(data)
                    }

                })
                .catch(e => {
                    console.log(e);
                })
    }


    
    return <>
            {
                currentUser !== "" && loadData === false ? (
                    <>
                        <section className="user-content">
                            <Header className="user-content__header header">
                                <a 
                                    href="#"
                                    className='header__link'
                                >
                                    <img 
                                        className='header__avatar'
                                        src={currentUser.avatar} 
                                        width="36px"
                                        height="36px" 
                                        alt="avatar"    
                                    />    
                                </a>
                                <DropDown/>
                            </Header>

                            <Controls/>

                            <ul className="chat-list">
                            {
                                search === '' ?
                                    <ChatList userChats={currentUser.userChats} /> 
                                    :
                                    <FilterChatList userChats={currentUser.userChats} />
                            }
                            </ul>
                            
                        </section>

                        <section className="chat-content">
                            {
                                chat !== '' && stompUser !== "" ? 
                                    <ChatControls user={currentUser}/> 
                                    : 
                                    <></>
                            }
                        </section>
                    </>
                ) : <Loader />
            }
    </>
}