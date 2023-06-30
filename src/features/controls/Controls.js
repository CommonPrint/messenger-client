import styled from 'styled-components';
import { Search } from './search/Search';


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Controls = () => {

  return (
    <Wrapper>
      <Search />
    </Wrapper>
  );
};
