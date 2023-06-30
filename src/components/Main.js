import styled from 'styled-components';
import {Container} from './Container';

const Wrapper = styled.main`
    height: 100%;
`

export const Main = ({children}) => {
    return (
        <Wrapper>
            <Container>{children}</Container>
        </Wrapper>
    )
}