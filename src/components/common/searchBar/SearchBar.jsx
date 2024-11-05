import styled from 'styled-components';
import { Orange } from '../../../color';
import { ReactComponent as SearchIcon } from '../../../assets/Icon/detail/Feather Icon.svg';

const SearchBar = ({ onChangeHandler, onKeyDownHandler, searchInput }) => {
    return (
        <StyledSearchBar>
            <Icon>
                <SearchIcon />
            </Icon>
            <input
                type="text"
                placeholder="검색어를 입력해주세요..."
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                value={searchInput}
            />
        </StyledSearchBar>
    );
};

export default SearchBar;

const StyledSearchBar = styled.div`
    width: 60%;
    display: flex;
    text-align: left;
    & > input {
        width: 100%;
        height: 45px;
        border-radius: 30px;
        border: 1px solid ${Orange};
        z-index: 1;
        padding-left: 70px;
        font-size: 16px;
        color: ${Orange};
    }
    input::placeholder {
        color: ${Orange};
    }
    @media screen and (max-width: 1024px) {
        width: 80%;
    }
`;

const Icon = styled.div`
    position: absolute;
    z-index: 2;
    padding: 10px 30px;
`;
