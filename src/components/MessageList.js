import styled from "styled-components"

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";

import { formatTimeMessage } from "../utils/getFormatTime";
import { getUser } from "../slices/users";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/getToken";

import { getDate, getMonth, getYear } from "../utils/getFormatTime";
import { useWebSocket } from "../features/controls/websocket/useWebSocket";


const MessageListElem = styled.ul`
`


export const MessageList = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = getToken();

    const bottomRef = useRef(null);
    
    const chat = useSelector((state) => state.demo.chat);

    const messages = useSelector((state) => state.demo.chat.messages);
    
    const [editMsg, setEditMsg] = useState(null);
    const [messageEditText, setMessageEditText] = useState();

    const [stompUser, handleStomp] = useWebSocket();

    const [loadData, setLoadData] = useState(true);
    
    const [currentUser, setCurrentUser] = useState(localStorage.getItem('current-userId'));


    useEffect(() => {

        (async () => {

            if(localStorage.getItem("current-userId") && token !== '') {
        
                let id = +localStorage.getItem("current-userId");   
                
                if(id) {
                   await fetchUser(id);

                //    bottomRef.current?.scrollIntoView({behavior: 'auto'});
                   setLoadData(false);
                }
                
            }
            
            else {
                navigate('/login');
            }

        })()

        
    }, [currentUser.username])


    useEffect(() => {
        console.log('Messages chat: ', messages);
        bottomRef.current?.scrollIntoView({behavior: 'auto'});
    }, [loadData])
    // }, [messages])
    


    const fetchUser = async (id) => {
        try {
            const data  = await dispatch(getUser(id)).unwrap();

            setCurrentUser(data);

        } catch(e) {
            console.log(e);
        }
        
    }

    const getDateInfo = (date) => {
        date = new Date(date);
        return `${getDate(date)} ${getMonth(date)} ${getYear(date)}`
    }


    const compareTwoDates = (msgCurr, msgNext) => {
        let getMessageCurr = new Date(msgCurr?.createTime);
        let getMessageNext = new Date(msgNext?.createTime);
        
        
        let isDateMatch = 
        `${getMessageNext.getDate()}/${getMessageNext.getMonth()}/${getMessageNext.getFullYear()}` === `${getMessageCurr.getDate()}/${getMessageCurr.getMonth()}/${getMessageCurr.getFullYear()}`
        
        return isDateMatch
    }


    // Все ли прочитали данное сообщение
    const isAllReadMessage = (recipients) => {
        let isRead = true;

        recipients.forEach((recipient) => {
            if(!recipient.read) {
                isRead = false;
            }
        })

        return isRead;
    }


    const readMessages = (payload) => {

    } 


    const editMessage = (message) => {
        setEditMsg(message.id);
        setMessageEditText(message.content);
    }

    const handleEditMessage = (event) => {
        setMessageEditText(event.target.value);
    }

    

    const postEditMessage = (message) => {
        
        if(stompUser) {

            if(chat.type.name === "private") { 

                let messageEdit = {
                    id: message.id,
                    content: messageEditText,
                    type: message.type,
                    chatId: chat.id,
                    creatorId: message.creator.id,
                    extension: message.extension,
                    createTime: message.createTime
                }

                stompUser.send('/app/message/private-edit', {}, JSON.stringify(messageEdit))

                setEditMsg(null);
            }

        }

    }

    // Редактировать сообщение после нажатия на "Enter"
    const postEditMessageKeyDown = (event, msg) => {

        if(event.key === "Enter") {
            postEditMessage(msg);
        }

    }



    const deleteMessage = (message) => {
        
        if(stompUser) {

            if(chat.type.name === "private") {
                
                console.log('Delete3 messageId: ', message.id);

                let messageDelete = {
                    id: message.id,
                    chatId: chat.id,
                    creatorId: message.creator.id,
                    recipients: [chat.anotherUserId],
                }

                stompUser.send('/app/message/private-delete', {}, JSON.stringify(messageDelete))
            } 


        }

    }


    return <>
    <MessageListElem className="chat-content__messages messages">
        {   loadData === false && messages !== undefined ?
            messages.map((msg, i) => {
                return (
                    <>
                        {
                            i === 0 ? <div className="message__date">{getDateInfo(msg.createTime)}</div> : <></>
                        }
                        <li 
                            key={"ACT"+msg.id}
                            className={
                                        currentUser.username === msg.creator.username ? 
                                            "message your-message" : "message another-message"
                            }
                        >
                            {
                                editMsg === msg.id ? 
                                <input
                                    type="text"
                                    className="message__edit"
                                    value={messageEditText}
                                    onChange={handleEditMessage}
                                    onKeyDown={(event) => postEditMessageKeyDown(event, msg)}
                                    onBlur={() => postEditMessage(msg)}
                                    autoFocus
                                /> : 
                                (<>
                                    {msg.type === "text" ? 
                                        <span className="message-content">
                                            {msg.content}
                                        </span>
                                        :
                                        <img src={msg.content} width="300px" height="200px" />
                                    }
                                    
                                    <span className="message-metadata">
                                        <span className="message-time">
                                            {formatTimeMessage(msg.createTime)}
                                        </span>
                                        { currentUser.username === msg.creator.username ? 
                                            <>
                                                {
                                                    isAllReadMessage(msg.recipients) === true ? 
                                                    <span className="message-status message-read"/> 
                                                    : 
                                                    <span className="message-status message-unread"/>
                                                }
                                            </> 
                                            : 
                                            <></>
                                        }
                                    </span>
                                    { currentUser.username === msg.creator.username ? 
                                        <ul className="message-dropdown">
                                            {
                                                msg.type === "text" ? 
                                                    <li key={"KTE"+msg.id+1111} className="message-dropdown__item">
                                                        <button 
                                                            type="button"
                                                            onClick={() => editMessage(msg)}
                                                            className="message-dropdown__item-btn"
                                                        >
                                                            Edit
                                                        </button>
                                                    </li> : <></>
                                            }
                                            
                                            <li key={"KTD"+msg.id+1111} className="message-dropdown__item">
                                                <button 
                                                    type="button"
                                                    onClick={() => deleteMessage(msg)} 
                                                    className="message-dropdown__item-btn"
                                                >
                                                    Delete
                                                </button>
                                            </li>
                                        </ul> : <></>
                                    }
                                </>)
                            }
                        </li>
                        
                        {
                            (i !== 0 && i !== messages.length-1) && compareTwoDates(msg, messages[i+1]) !== true ? 
                                <div className="message__date">
                                    {getDateInfo(messages[i+1].createTime)}
                                </div> : <></>
                        }
                    </>
                )
            }) : <></>
        }
        <div ref={bottomRef} />
    </MessageListElem>
    
    </>
}