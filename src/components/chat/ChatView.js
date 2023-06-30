import styled from 'styled-components';

import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { Header } from '../Header';
import { Loader } from '../loaders/Loader';
import { EmojiList } from '../form/EmojiList';
import { MessageList } from '../MessageList';


import { formatTimeLastActive, formatTimeMessage } from '../../utils/getFormatTime';

import { useWebSocket } from '../../features/controls/websocket/useWebSocket';

import { convertBytes } from '../../utils/convertBytes';

import useOutsideClick from '../../hooks/useOutsideClick';
import iconClose from "../../assets/img/icon-close.svg";



export const ChatView = ({user}) => {
    
    const ref = useRef();
    const refModal = useRef();

    const chat = useSelector((state) => state.demo.chat);

    const [stompUser, handleStomp] = useWebSocket();

    const [loadData, setLoadData] = useState(true);


    const [fileMsg, setFileMsg] = useState("");  

    const [message, setMessage] = useState("");
    const [currentUser, setCurrentUser] = useState(user);
    
    let messages = useSelector((state) => state.demo.messages);

    const [emojiListOpen, setEmojiListOpen] = useState(false);

    // Закроет выпадающее меню эмодзи, если кликнуть на что-либо за пределами эмодзи
    useOutsideClick(ref, () => {
        if(emojiListOpen) 
            setEmojiListOpen(false);
    })

    // Закроет модальное окно для файла
    useOutsideClick(refModal, () => {
        if(fileMsg) 
            setFileMsg("");
    })

    useEffect(() => {
        
        setLoadData(false);
    
    }, [currentUser.username, stompUser, loadData, chat.type, messages]) 



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


    // Добавление сообщения
    const handleMessage = (e) => {
        setMessage(e.target.value);
    }

    const handleEmoji = (emoji) => {
        setMessage(`${message} ${emoji}`);
    }


    // Отправить сообщение
    const sendPrivateMessage = () => {

        if (stompUser) {
             
            let chatMessage = {
                content: message,
                type: "text",
                creatorId: currentUser.id,
                chatId: chat.id,
                recipients: [chat.anotherUserId],
                status: "MESSAGE"
            };
             

            stompUser.send("/app/message", {}, JSON.stringify(chatMessage))
            
            // bottomRef.current?.scrollIntoView({behavior: 'smooth'})
            
            setMessage("");
         }

    }

    // Отправить сообщение с помощью кнопки "Enter"
    const handleKeyDown = (e) => {
        if(e.key === "Enter") {

            let chatMessage = {
                content: message,
                type: "text",
                creatorId: currentUser.id,
                chatId: chat.id,
                recipients: [chat.anotherUserId],
                status: "MESSAGE"
            };
             
            stompUser.send("/app/message", {}, JSON.stringify(chatMessage))
            
            // bottomRef.current?.scrollIntoView({behavior: 'smooth'})
            
            setMessage("");
        }
    }



    // Отправка файла
    const handleFile = async (event) => {
        const {value} = event.target;

        let fileSize = convertBytes(event.target.files[0].size);

        let srcPath = URL.createObjectURL(event.target.files[0]);

        let fileBase64;
        
        await convertBase64(event.target.files[0]).then(async (value) => {
            fileBase64 = await value;
        });

        console.log('Result file convertBase64: ', fileBase64);

        console.log("Value file: ", value);
        console.log("event.target.files[0]: ", event.target.files[0]);

        let file = {
            name: event.target.files[0].name,
            type: event.target.files[0].type,
            size: fileSize,
            src: srcPath,
            base64: fileBase64
        }


        setFileMsg(file);
    }




    // Конвертация изображения в base64
    const convertBase64 = async (file) => {
        return await new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };
    
            fileReader.onerror = (error) => {
                reject(error);
            };
        })
    };



    // Отправить изображение в личку
    const sendFile = async () => {
        

        let reader = new FileReader();      
        
        console.log('Send file: ', reader);


        reader.loadend = function() {

        }

        if(stompUser) {
            
            // let data = {
            //     name: fileMsg.name, 
            //     base64: fileMsg.base64
            // }
            console.log('FileMsg64: ', fileMsg.base64);

            let data = `name:${fileMsg.name};${fileMsg.base64}`;

            let chatFile = {
                content: data,
                type: "file",
                chatId: chat.id,
                creatorId: currentUser.id,
                recipients: [chat.anotherUserId],
                status: "MESSAGE"
            };
            
            console.log('File private: ', chatFile);

            stompUser.send("/app/message/private-file", {}, JSON.stringify(chatFile))
            
            setFileMsg("");

        }
            

        // reader.onload = function(e) {
            
        //     console.log('File onload: ', e);

        //     if (stompUser) {
                
        //         let data = {
        //             name: fileMsg.name, 
        //             base64: fileMsg.base64
        //         }

        //         let chatFile = {
        //             content: data,
        //             type: "file",
        //             chatId: chat.id,
        //             creatorId: currentUser.id,
        //             recipients: [chat.anotherUserId],
        //             status: "MESSAGE"
        //         };
                
        //         console.log('File private: ', chatFile);

        //         stompUser.send("/app/message/private-file", {}, JSON.stringify(chatFile))
                
        //     }
            
        //     setFileMsg("")
        // }

        // reader.readAsArrayBuffer(file);
    }




    return <>
        { !loadData && messages !== undefined ?
            <> 
                <Header className="chat-content__header chat-header">
                    <a 
                        href="#"
                        className='chat-header__link'
                    >
                        <img 
                            className='chat-header__avatar'
                            src={chat.avatar} 
                            width="36px"
                            height="36px"
                            alt="avatar"  
                        />
                    </a>
                    <div className="chat-header__data">
                        <h3 className="chat-header__name">
                            {chat.name}
                        </h3>
                        {
                            chat.online == true && chat.type.name === "private" ? 
                                <p className="chat-header__user-activation" style={{"marginTop": "5px"}}>Online</p> 
                                : 
                                <p className="chat-header__user-activation" style={{"color": "#606572", "marginTop": "5px"}}>
                                    Was online {formatTimeLastActive(chat.lastActive)}
                                </p>
                        }
                    </div>
                </Header>
                
                <MessageList/>

                {/* <form className="chat-content__form form-message" action="#" onSubmit={onPrivateMessage} method="post"> */}
                <div className="chat-content__form form-message">
                    <div className="form-message-emoji" ref={ref}>
                        <label
                            className="form-message-emoji__label" 
                            htmlFor="emojis" 
                            onClick={() => setEmojiListOpen(true)}
                        />
                        <EmojiList 
                            id="emojis" 
                            name="emojis" 
                            handleEmoji={handleEmoji}
                            classes={
                                `emoji-list ${emojiListOpen === true ? 'emoji-list-open' : ''}`
                            }
                        />
                    </div>

                    <div className="form-message-file">
                        <label className="form-message-file__label" htmlFor="attach" />
                        <input 
                            className="visually-hidden" 
                            type="file" 
                            id="attach" 
                            name="file"
                            onChange={handleFile}    
                        />
                    </div>
                    
                    <input 
                        className="form-message-field"
                        id="message" 
                        name="message" 
                        type="text" 
                        placeholder="Enter message..."
                        value={message}
                        onChange={handleMessage}
                        onKeyDown={handleKeyDown}
                        autoComplete="off"  
                    />

                    <button 
                        type="button" 
                        onClick={sendPrivateMessage}
                        className="form-message-submit" 
                    >
                        <span className="visually-hidden">Отправить сообщение</span>
                    </button>
                </div>
                {/* </form> */}

                
                    <div 
                        className={`modal ${fileMsg ? "modal-open" : ""}`}
                    >
                    { fileMsg ?
                            <div className="modal-box" ref={refModal}>
                                <button 
                                    type="button" 
                                    className="modal-box__close-btn"
                                    onClick={() => setFileMsg("")}
                                >
                                    <img src={iconClose} width="18px" height="18px" />
                                </button>

                                <img 
                                    src={fileMsg.src} 
                                    width="560px" 
                                    height="250px" 
                                    className="modal-box__file-img" 
                                />

                                <div className="modal-box__file-info file-info">
                                    <h3 className="file-info__name">
                                        {fileMsg.name}
                                    </h3>
                                    <span className="file-info__size">
                                        {fileMsg.size}
                                    </span>
                                </div>
                                
                                <button 
                                    type="button"
                                    className="modal-box__send"
                                    onClick={sendFile}
                                >
                                    Send
                                </button>
                            </div> : <></>
                        }
                    </div>
            </> 
            : 
            <Loader/>
        }
    </>
}