import styled from 'styled-components';

const ListChildElem = styled.li`
    font-size: var(--fs-sm);
    cursor: pointer;
`

export const ListElem = ({text, onClick}) => {
    return <ListChildElem onClick={onClick}>
        {text}
    </ListChildElem>
}
