import styled from 'styled-components';

export const LoaderElem = styled.div`
    
`;

export const Loader = () => {
    return <LoaderElem className="lds-ring">
        <div></div><div></div><div></div><div></div>
    </LoaderElem>
}