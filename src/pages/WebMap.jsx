import styled from 'styled-components';
import { Category, StoreList, MobileNav, MyMap } from '../components/common';
import { LightGrey, Orange, White } from '../color';
import { ReactComponent as SearchIcon } from '../assets/Icon/Feather Icon.svg';
import { ReactComponent as DashBoard } from '../assets/Icon/DashBoard.svg';
import { ReactComponent as Home } from '../assets/Icon/Home.svg';
import { ReactComponent as Arrow } from '../assets/Icon/Arrow.svg';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStoreList } from '../store';
const WebMap = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isStoreList, setIsStoreList] = useState(true);
    const [categoryState, setIsCategoryState] = useState(location.state?.visible || false);
    const [station, setStation] = useState();
    const [count, setCount] = useState();
    const { setStoreList } = useStoreList();
    useEffect(() => {
        if (location.state?.listVisible) {
            setIsStoreList(true);
            setCount(1);
        }
        if (!location.state?.listVisible) {
            setIsStoreList(false);
            setCount(0);
        }
        if (location.state?.visible) {
            setIsCategoryState(true);
        } else if (!location.state?.visible) {
            setIsCategoryState(false);
        }
        if (location.state?.listVisible) {
            setIsStoreList(true);
        }
    }, [location.state]);
    //const {id } = useParams();
    //const {item} = data;
    const dashboardClickHandler = () => {
        setIsStoreList(!isStoreList);
    };
    const categoryClickHandler = () => {
        setIsCategoryState(!categoryState);
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
            setIsStoreList(true);
            setIsCategoryState(false);
            setStation(station);
        }
    };
    return (
        <WebMapLayout>
            <NavBox>
                <button onClick={dashboardClickHandler}>
                    <DashBoard />
                </button>
                <button onClick={homeClickHandler}>
                    <Home />
                </button>
            </NavBox>
            {isStoreList && <StoreList station={station} />}
            <ContentsContainer>
                {!isStoreList && (
                    <SearchBarBox>
                        <Icon>
                            <SearchIcon />
                        </Icon>
                        <input
                            type="text"
                            placeholder="지하철역으로 검색..."
                            onChange={onChangeHandler}
                            onKeyDown={onKeyDownHandler}
                            value={station}
                        />
                        <CategoryButton onClick={categoryClickHandler}>
                            <p>카테고리 설정</p>
                            <Arrow />
                        </CategoryButton>
                    </SearchBarBox>
                )}
                <MapContainer>
                    <MyMap />
                </MapContainer>
            </ContentsContainer>
            {categoryState && (
                <CategoryContainer $visible={categoryState}>
                    <p>카테고리</p>
                    <Category position="absolute" />
                </CategoryContainer>
            )}
            {!categoryState && (
                <CloseCategory>
                    <button
                        onClick={() => {
                            setIsCategoryState(true);
                            setStoreList([]);
                        }}
                    >
                        {count}
                    </button>
                </CloseCategory>
            )}
            <MobileNav />
        </WebMapLayout>
    );
};

export default WebMap;

const WebMapLayout = styled.div`
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100vh; /* 화면의 전체 높이를 차지 */
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
    & > button {
        width: 40px;
        height: 40px;
        cursor: pointer;
        border-radius: 100px;
        background-color: ${LightGrey};
        &:hover {
            width: 50px;
            height: 50px;
        }
    }
    @media screen and (max-width: 1024px) {
        display: none;
    }
`;

const ContentsContainer = styled.div`
    display: flex;
    flex-direction: column;
    //align-items: center;
    //width: calc(100% - 120px); /* NavBox를 제외한 나머지 너비 */
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
        //max-width: 1000px;
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
        //align-items: center;
        margin-left: 0px;
        & > input {
            position: relative;
        }
    }
`;

const Icon = styled.div`
    position: absolute;
    z-index: 2;
    padding: 10px 20px;
`;

const CategoryButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 20px;
    border-radius: 20px;
    cursor: pointer;
    box-shadow: 0px 5px 5px 0px ${LightGrey};
    width: 175px;
    height: 65px;
    & > p {
        margin: 0;
        font-size: 14px;
    }
    & > svg {
        margin-left: 15px;
    }
    @media screen and (max-width: 1024px) {
        display: none;
    }
`;

const MapContainer = styled.div`
    max-width: 100%;
    flex: 1 1;
    margin: 0;
    display: flex;
    flex-direction: row;
    background: ${LightGrey};
`;

const CategoryContainer = styled.div`
    max-width: 210px;
    height: 100%;
    display: flex;
    //position: absolute;
    z-index: 100;
    top: 0;
    right: 0;
    align-items: center;
    flex-direction: column;
    background-color: ${White};
    & > p {
        padding-top: 30px;
        margin-bottom: 10px;
        font-weight: 500;
    }
    & > div {
        gap: 20px;
        width: fit-content;
    }
    box-shadow: 0px 5px 5px 0px ${LightGrey};
    @media screen and (max-width: 1024px) {
        //width: 100px;
    }
`;

const CloseCategory = styled.div`
    width: 68px;
    height: 100%;
    background-color: ${White};
    & > button {
        border-radius: 100px;
        background-color: ${Orange};
        color: ${White};
        margin-top: 50px;
        width: 54px;
        height: 44px;
        font-size: 16px;
    }
    @media screen and (max-width: 1024px) {
        display: none;
    }
`;
