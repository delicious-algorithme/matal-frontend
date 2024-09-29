import styled from 'styled-components';
import { ReactComponent as SearchIcon } from '../../assets/Icon/Feather Icon.svg';
import { ReactComponent as DashBoard } from '../../assets/Icon/DashBoard.svg';
import { ReactComponent as ArrowRight } from '../../assets/Icon/ArrowNav.svg';
import { ReactComponent as Logo } from '../../assets/Icon/Logo.svg';
import { Orange } from '../../color';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useIsFetch, useStoreList } from '../../store';
const MainHeader = () => {
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState();
    const { setIsFetchAll } = useIsFetch();
    const { storeList } = useStoreList();
    const dashboardClickHandler = () => {
        if (storeList.length === 0) {
            setIsFetchAll(true);
        }
        navigate(`/webmap`);
    };
    const onChangeHandler = (e) => {
        setSearchInput(e.target.value);
    };
    const onKeyDownHandler = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setIsFetchAll(false);
            if (e.target.value) {
                navigate(`/webmap/storeList/${searchInput}`, {
                    state: {
                        searchInput: `${searchInput}`,
                    },
                });
            }
        }
    };
    return (
        <MainHeaderLayout>
            <LogoBox>
                <Logo />
            </LogoBox>
            <SearchBarAndNav>
                <SearchBarBox>
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
                </SearchBarBox>
                <Nav>
                    <DashBoard />
                    <p onClick={dashboardClickHandler}>대시보드</p>
                    <ArrowRight />
                </Nav>
            </SearchBarAndNav>
        </MainHeaderLayout>
    );
};
export default MainHeader;

const MainHeaderLayout = styled.div`
    display: flex;
    margin-top: 50px;
    width: 100%;
    height: auto;
    justify-content: center;
    @media screen and (max-width: 1024px) {
        flex-direction: column;
        align-items: center;
    }
`;

const LogoBox = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    @media screen and (min-width: 1024px) {
        margin-bottom: 73px;
        margin-left: 50px;
    }
`;

const SearchBarAndNav = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-direction: column;
    margin-bottom: 30px;
`;

const SearchBarBox = styled.div`
    width: 100%;
    max-width: 900px;
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
        & > input {
            width: 80%;
            margin-left: 10%;
        }
    }
`;

const Icon = styled.div`
    position: absolute;
    z-index: 2;
    padding: 10px 30px;
    @media screen and (max-width: 1024px) {
        margin-left: 10%;
    }
`;

const Nav = styled.div`
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
    & > p {
        color: #959895;
        font-size: 16px;
        cursor: pointer;
        &:hover {
            color: ${Orange};
        }
    }
    @media screen and (max-width: 1024px) {
        display: none;
    }
`;
