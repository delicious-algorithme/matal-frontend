import styled from 'styled-components';
import { DarkGrey, LightGrey } from '../../../color';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const SearchBar = ({ onChangeHandler, onKeyDownHandler, searchInput }) => {
    return (
        <StyledSearchBar>
            <Icon>
                <SearchRoundedIcon alt="search-icon" />
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
    width: 100%;
    display: flex;
    position: relative;
    text-align: left;

    & > input {
        width: 100%;
        height: 45px;
        border-radius: 10px;
        z-index: 1;
        padding-left: 70px;
        font-size: 16px;
        color: ${DarkGrey};
        background: ${LightGrey};
    }

    input::placeholder {
        color: ${DarkGrey};
    }
`;

const Icon = styled.div`
    position: absolute;
    z-index: 2;
    padding: 10px 30px;

    color: ${DarkGrey};
`;
