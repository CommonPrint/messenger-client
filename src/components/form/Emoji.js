import styled from "styled-components"

const EmojiElem = styled.li`
    font-size: 24px;
`

export const Emoji = ({emoji, handleEmoji}) => {
    return <EmojiElem onClick={() => handleEmoji(emoji)}>
        {emoji}
    </EmojiElem>
}