import ChatListElem from "./ChatListElem"

export const ChatList = ({userChats}) => {
     return <>
        {
            userChats.map((elem) => {
                return <ChatListElem key={"key"+elem.id} data={elem} />
            })
        }
    </>
}