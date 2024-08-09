import styled from 'styled-components';
import { ReactComponent as SearchIcon } from '../../assets/Icon/Feather Icon.svg';
import { ReactComponent as DashBoard } from '../../assets/Icon/DashBoard.svg';
import { ReactComponent as Game } from '../../assets/Icon/Game.svg';
import { ReactComponent as ArrowRight } from '../../assets/Icon/ArrowNav.svg';

import { Orange } from '../../color';
const MainHeader = () => {
    return (
        <MainHeaderLayout>
            <SearchBarAndNav>
                <SearchBarBox>
                    <Icon>
                        <SearchIcon />
                    </Icon>
                    <input type="text" placeholder="Search..." />
                </SearchBarBox>
                <Nav>
                    <DashBoard />
                    <p>대시보드</p>
                    <ArrowRight />
                    <Game />
                    <p>top 100</p>
                </Nav>
            </SearchBarAndNav>
            <User></User>
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
    align-items: center;
`;
const SearchBarAndNav = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    flex-direction: column;
    margin-bottom: 30px;
`;

const SearchBarBox = styled.div`
    width: 100%;
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
`;
const User = styled.div``;
