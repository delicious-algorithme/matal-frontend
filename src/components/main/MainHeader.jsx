import styled from 'styled-components';
import { ReactComponent as SearchIcon } from '../../assets/Icon/Feather Icon.svg';
import { ReactComponent as DashBoard } from '../../assets/Icon/DashBoard.svg';
import { ReactComponent as ArrowRight } from '../../assets/Icon/ArrowNav.svg';
import { ReactComponent as Logo } from '../../assets/Icon/Logo.svg';
import { Orange } from '../../color';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useIsFirst } from '../../store';
const MainHeader = () => {
    const navigate = useNavigate();
    const [name, setName] = useState();
    const { setIsFirst, setNotIsFirst } = useIsFirst();
    const dashboardClickHandler = () => {
        setIsFirst();
        navigate(`/webmap`);
    };
    const onChangeHandler = (e) => {
        setName(e.target.value);
    };
    const onKeyDownHandler = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setNotIsFirst();
            if (e.target.value) {
                navigate(`/webmap/storeList/${name}`);
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
                        placeholder="이름으로 검색..."
                        onChange={onChangeHandler}
                        onKeyDown={onKeyDownHandler}
                        value={name}
                    />
                </SearchBarBox>
                <Nav>
                    <DashBoard />
                    <p onClick={dashboardClickHandler}>대시보드</p>
                    <ArrowRight />
                </Nav>
            </SearchBarAndNav>
            <User />
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
    //align-items: center;
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
`;

const Icon = styled.div`
    position: absolute;
    z-index: 2;
    padding: 10px 30px;
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
const User = styled.div``;
