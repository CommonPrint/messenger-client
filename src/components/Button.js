import styled from 'styled-components';

export const ButtonElem = styled.button`
    
`;

export const Button = ({type, className, onClick, children}) => {
    return <ButtonElem type={type} className={className} onClick={onClick}>
        {children}
    </ButtonElem>
}