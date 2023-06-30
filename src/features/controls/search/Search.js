import styled from 'styled-components';

import { useSearch } from './useSearch';

const InputContainer = styled.label`
  ${'' /* background-color: var(--colors-ui-base); */}
  display: flex;
  align-items: center;

  ${'' /* border-radius: var(--radii);
  box-shadow: ; */}
  width: 100%;
  padding: 10px;
  background-color: #111b21;
  padding: 12px 10px 12px 10px;
`;

const Input = styled.input.attrs({
    type: 'search',
    placeholder: 'Search or new chat'
})`
    width: calc(100% - 20px);
    padding: 8px 6px;
    border-radius: 5px;
    font-size: var(--fs-sm);
    
    border: none;
    outline: none;

    color: #fff;
    background-color: #34373f;
`

export const Search = () => {

    const [search, handleSearch] = useSearch();
    
    return (
        <InputContainer>
            <Input onChange={handleSearch} value={search} />
        </InputContainer>
    )

}