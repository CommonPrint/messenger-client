import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"

import getFormatTime from "../../../utils/getFormatTime"

const FilterChatListUser = ({user}) => {

    const dispatch = useDispatch();
    
    const currentUser = +localStorage.getItem('current-userId')

    const [loadData, setLoadData] = useState(true);

    // useEffect(() => {
    //     userInfo();    
    // }, [])


    // const userInfo = () => {

    //     setLoadData(true);
    // }
    

    return (loadData === true && user !== undefined) ? 
            (<li className="chat-list__elem chat-info">
            
                <div className="chat-info__avatar">
                    <img 
                        src={user.avatar} 
                        width="40px" 
                        height="40px"
                        alt="avatar"    
                    />
                    {user.online ? <span className="chat-info__user-online"></span> : <></>}
                </div>

                <div className="chat-info__data">
                    <h3>{user.username}</h3>
                </div>
            </li>) : <></>
}

export default FilterChatListUser;