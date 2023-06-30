import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"

import getFormatTime from "../../../utils/getFormatTime"

const FilterChatListElem = ({chat}) => {

    const dispatch = useDispatch();
    
    const currentUser = +localStorage.getItem('current-userId')

    const [loadData, setLoadData] = useState(true);

    const [lastMessage, setLastMessage] = useState('');
    const [countUnreadMessage, setCountUnreadMessage] = useState(0);


    useEffect(() => {
        chatInfo();    
    }, [])


    const chatInfo = () => {

        if(chat.messages?.length > 0) {
            setLastMessage(chat.messages[chat.messages?.length-1])
        }

        chat.messages.forEach(element => {
            element.recipients.forEach((item) => {
                
                if(item.userId === currentUser && item.read !== true) {
                    setCountUnreadMessage(countUnreadMessage + 1);
                } 
                 
            })
        });

        setLoadData(true);

    }
    

    return (loadData === true && chat !== undefined) ? 
            (<li className="chat-list__elem chat-info">
                {/* <ChatListElemInfo chat={chat} /> */}

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
                            lastMessage.content?.length > 40 ? 
                                <span>{lastMessage.content.slice(0, 40)} ...</span> 
                                :
                                <span>{lastMessage.content}</span>
                        }
                    </p>
                </div>
                <div className="chat-info__metadata">
                    <p>
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
            </li>) : <></>
}

export default FilterChatListElem;