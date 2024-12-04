import styled from 'styled-components';
import { Orange } from '../../../color';

const SearchBar = ({ onChangeHandler, onKeyDownHandler, searchInput }) => {
    return (
        <StyledSearchBar>
            <Icon>
                <img
                    src="https://wnstn6945.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F499f229c-bff2-4c82-ae94-81c36fa59a9c%2Fa38d3a64-cd82-45b2-83b7-c3710caa064a%2FFeather_Icon.svg?table=block&id=042552b6-28a0-4f1c-a753-45c60a3aaafc&spaceId=499f229c-bff2-4c82-ae94-81c36fa59a9c&userId=&cache=v2"
                    alt="search-icon"
                />
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
`;

const Icon = styled.div`
    position: absolute;
    z-index: 2;
    padding: 10px 30px;
`;
