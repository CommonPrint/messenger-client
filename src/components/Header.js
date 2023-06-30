import styled from 'styled-components';

const HeaderElem = styled.header`

`

export const Header = ({children, className}) => {
    return <HeaderElem className={className}>
        {children}
    </HeaderElem>
}