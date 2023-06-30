import { useState, useEffect } from "react"

import getFormatTime from "../../utils/getFormatTime"
import { selectorChat } from "../../features/controls/demo/demo-slice";
import { useDispatch, useSelector } from "react-redux";

import imageIcon from "../../assets/img/image-icon.svg"

const ChatListElemInfo = ({chat}) => {

    const dispatch = useDispatch();

    const currentUserId = +localStorage.getItem('current-userId');

    const [loadData, setLoadData] = useState(true);

    // const [visibleChat, handleChat] = useChat();

    // let lastMsg = useSelector((state) => state.chats[].lastMessage);
    const chatIndex = useSelector((state) => state.demo.chats.findIndex(elem => elem.id === chat.id));
    
    let lastMessage = useSelector((state) => state.demo.chats[chatIndex].lastMessage);
    // console.log('l-a-s-t msg: ', lastMsg);
    // const [lastMessage, setLastMessage] = useState(lastMsg);

    // const [lastMessage, setLastMessage] = useState('');
    
    const [countUnreadMessage, setCountUnreadMessage] = useState(0);

    useEffect(() => {
        chatInfo();
        console.log('last message: ', lastMessage);
    }, [loadData, lastMessage]);

    const selectChat = (id) => {
        dispatch(selectorChat(id));
    }


    const chatInfo = () => {
        
        if(chat.messages.length > 0) {
            // setLastMessage(chat.messages[chat.messages.length-1])
            // setLastMessage(lastMsg.message);
        }

        let countUnreadMessage = 0;

        chat.messages.forEach(element => {
            element.recipients.forEach((item) => {
                
                if(item.userId === currentUserId && item.read !== true) {
                    countUnreadMessage++;
                }
                 
            })
        });

        countUnreadMessage > 0 ? setCountUnreadMessage(countUnreadMessage) : setCountUnreadMessage(0);

        setLoadData(false);

    }

    return (!loadData && chat !== undefined) ? (
        <li className="chat-list__elem chat-info" onClick={() => selectChat(chat.id)}>
            <div className="chat-info__avatar">
                <img 
                    src={chat.avatar} 
                    width="40px" 
                    height="40px"
                    alt="avatar"    
                />
                {chat.online ? <span className="chat-info__user-online"></span> : <></>}
            </div>
            <div className="chat-info__data">
                <h3>{chat.name}</h3>
                <p className="chat-info__data short">
                    {
                        lastMessage.type === "file" ? 
                        <div style={{display: "flex", alignItems: "center", gridTemplateColumns: "auto 1fr"}}>
                            <span style={{marginRight: "5px"}}>Image</span>
                            <img src={imageIcon} width="20px" height="20px" /> 
                        </div> 
                        : 
                        (
                            lastMessage.content.length > 40 ? 
                                <span>{lastMessage.content.slice(0, 40)} ...</span> 
                                : 
                                <span>{lastMessage.content}</span>
                        )
                    }
                    
                </p>
            </div>
            <div className="chat-info__metadata">
                <p className="chat-info__metadata-time">
                    <time>{getFormatTime(lastMessage.createTime)}</time>
                </p>
                <p>
                    {
                        countUnreadMessage > 0 ? 
                            <span className="count-unread__messages">
                                {countUnreadMessage}
                            </span> 
                            : 
                            <></>
                    }
                </p>
            </div>
        </li>
    ) : <></>
}

export default ChatListElemInfo;