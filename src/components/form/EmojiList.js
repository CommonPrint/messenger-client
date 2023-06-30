import styled from "styled-components";

import { emojis } from "../../utils/emojis"
import { Emoji } from "./Emoji";

const EmojiContainer = styled.div`
    width: 100px;
    margin: 0 auto;
`;

const EmojiListContainer = styled.div`
    position: relative;
    background-color: #fff;
    box-shadow: 0 2px 3px rgba(0,0,0, 0.15);
`;

const EmojiListWrapper = styled.ul`
    position: absolute;
    bottom: 20px;
    width: 390px;
    height: 200px;
    padding: 10px;

    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fill, 30px);

    overflow: auto;
    color: #000;
    border-radius: 7px;
    background-color: #fff;

    ::-webkit-scrollbar-track {
        background-color: #F5F5F5;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    }

    ::-webkit-scrollbar
    {
        width: 8px;
        background-color: #F5F5F5;
    }

    ::-webkit-scrollbar-thumb
    {
        background-color: #555;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    }
`

export const EmojiList = ({handleEmoji, classes}) => {

    return (
        <EmojiContainer className={classes}>
            <EmojiListContainer>
                <EmojiListWrapper>
                    {
                        emojis.map((item, i) => {
                            return <Emoji key={"akk" + i} emoji={item.emoji} code={item.code} handleEmoji={handleEmoji}/>
                        })
                    }
                </EmojiListWrapper>
            </EmojiListContainer>
        </EmojiContainer>
    )
}