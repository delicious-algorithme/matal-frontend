import styled from 'styled-components';
import { StoreList, MobileNav, MyMap } from '../components/common';
import { LightGrey, Orange } from '../color';
import { ReactComponent as SearchIcon } from '../assets/Icon/Feather Icon.svg';
import { ReactComponent as DashBoard } from '../assets/Icon/DashBoard.svg';
import { ReactComponent as Home } from '../assets/Icon/Home.svg';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useIsFirst } from '../store';
const WebMap = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isStoreList, setIsStoreList] = useState();
    const [station, setStation] = useState();
    const { setNotIsFirst } = useIsFirst();
    useEffect(() => {
        if (!location.state?.listVisible) {
            setIsStoreList(true);
        }
        if (location.state?.listVisible) {
            setIsStoreList(false);
        }
        if (location.state?.detailVisible) {
            setIsStoreList(false);
        }
        if (location.state?.listVisible) {
            setIsStoreList(true);
        }
    }, [location.state]);
    const dashboardClickHandler = () => {
        setIsStoreList(!isStoreList);
    };
    const homeClickHandler = () => {
        navigate('/');
    };
    const onChangeHandler = (e) => {
        setStation(e.target.value);
    };
    const onKeyDownHandler = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setNotIsFirst();
            setIsStoreList(true);
            setStation(station);
        }
    };
    return (
        <WebMapLayout>
            <NavBox>
                <DashBoardButton onClick={dashboardClickHandler} isStoreList={isStoreList}>
                    <DashBoard />
                </DashBoardButton>
                <HomeButton onClick={homeClickHandler}>
                    <Home />
                </HomeButton>
            </NavBox>
            {isStoreList && <StoreList station={station} />}
            <ContentsContainer>
                <SearchBarBox>
                    {!isStoreList && (
                        <>
                            <Icon>
                                <SearchIcon />
                            </Icon>
                            <input
                                type="text"
                                placeholder="검색어를 입력해주세요..."
                                onChange={onChangeHandler}
                                onKeyDown={onKeyDownHandler}
                                value={station}
                            />
                        </>
                    )}
                </SearchBarBox>
                <MapContainer>
                    <MyMap />
                </MapContainer>
            </ContentsContainer>
            <MobileNav />
        </WebMapLayout>
    );
};

export default WebMap;

const WebMapLayout = styled.div`
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;
    @media screen and (max-width: 1024px) {
        width: 100%;
    }
`;

const NavBox = styled.div`
    width: 120px;
    margin-top: 100px;
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
`;

const DashBoardButton = styled.button`
    width: 40px;
    height: 40px;
    cursor: pointer;
    border-radius: 100px;
    &:hover {
        width: 50px;
        height: 50px;
    }
    background-color: ${(props) => (props.isStoreList ? '#EA6A12' : '#F5F5F5')};
    & > svg > path {
        fill: ${(props) => (props.isStoreList ? '#FFFFFF' : '#EA6A12')};
    }
`;
const HomeButton = styled.button`
    width: 40px;
    height: 40px;
    cursor: pointer;
    border-radius: 100px;
    background-color: ${LightGrey};
    &:hover {
        width: 50px;
        height: 50px;
    }
`;
const ContentsContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100%;
`;

const SearchBarBox = styled.div`
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    gap: 30px;
    text-align: left;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    & > input {
        flex: 1 1 auto;
        height: 45px;
        border-radius: 30px;
        border: 1px solid ${Orange};
        z-index: 1;
        padding-left: 50px;
        font-size: 16px;
        color: ${Orange};
        padding-right: 20px;
    }
    input::placeholder {
        color: ${Orange};
    }
    @media screen and (max-width: 1024px) {
        position: absolute;
        margin: 0;
        top: 10%;
        left: 10%;
        width: 80%;
        margin-left: 0px;
        & > div > svg {
            display: none;
        }
        & > input {
            display: none;
        }
    }
`;

const Icon = styled.div`
    position: absolute;
    z-index: 2;
    padding: 10px 20px;
`;

const MapContainer = styled.div`
    max-width: 100%;
    flex: 1 1;
    margin: 0;
    display: flex;
    flex-direction: row;
    background: ${LightGrey};
`;
