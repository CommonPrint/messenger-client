import styled from 'styled-components';

const ListElem = styled.ul`

`

export const List = ({children}) => {
    return <ListElem>
        {children}
    </ListElem>
}
