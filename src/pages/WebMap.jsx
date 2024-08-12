import styled from 'styled-components';
import { Category, StoreList } from '../components/common';
import { LightGrey, Orange, White } from '../color';
import { ReactComponent as SearchIcon } from '../assets/Icon/Feather Icon.svg';
import { ReactComponent as DashBoard } from '../assets/Icon/DashBoard.svg';
import { ReactComponent as Game } from '../assets/Icon/Game.svg';
import { ReactComponent as Arrow } from '../assets/Icon/Arrow.svg';
import { MyMap, StoreDetail } from '../components/common';

const WebMap = () => {
    return (
        <WebMapLayout>
            <NavBox>
                <button>
                    <DashBoard />
                </button>
                <button>
                    <Game />
                </button>
            </NavBox>
            <StoreList />
            <ContentsContainer>
                <SearchBarBox>
                    <Icon>
                        <SearchIcon />
                    </Icon>
                    <input type="text" placeholder="Search..." />
                    <CategoryButton>
                        <p>카테고리 설정</p>
                        <Arrow />
                    </CategoryButton>
                </SearchBarBox>
                <MapContainer>
                    <MyMap />
                </MapContainer>
            </ContentsContainer>
            <StoreDetail />
            <CategoryContainer>
                <p>카테고리</p>
                <Category position={'absolute'} />
            </CategoryContainer>
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
    //width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-right: 200px;
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
    }
    input::placeholder {
        color: ${Orange};
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
`;

const MapContainer = styled.div`
    width: 100%;
    flex: 1 1 auto;
    margin: 0;
    background: ${LightGrey};
`;

const CategoryContainer = styled.div`
    width: 200px;
    height: 100%;
    display: flex;
    position: absolute;
    z-index: 200;
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
`;
