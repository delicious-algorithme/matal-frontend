import styled from 'styled-components';
import { Category, StoreList, MobileNav } from '../components/common';
import { LightGrey, Orange, White } from '../color';
import { ReactComponent as SearchIcon } from '../assets/Icon/Feather Icon.svg';
import { ReactComponent as DashBoard } from '../assets/Icon/DashBoard.svg';
import { ReactComponent as Game } from '../assets/Icon/Game.svg';
import { ReactComponent as Arrow } from '../assets/Icon/Arrow.svg';
import { MyMap } from '../components/common';

const data = [
    {
        id: 1,
        image: '',
        keyword: '서울시 냉면',
        name: '맛있는 알고리즘',
        address: '서울 종로구 광화문로 1길 234 5층',
        rating: 4.5,
        category: '냉면',
        reviewCount: '999',
        nearbyStation: '2,5호선 을지로9가역 1번 출구에서 239m',
        phone: '02-1234-5678',
        businessHours: [
            '토: 11:30 - 21:00 20:40 라스트오더',
            '일: 11:30 - 21:00 20:40 라스트오더',
            '월: 정기휴무 (매주 월요일)',
            '화: 11:30 - 21:00 20:40 라스트오더',
            '수: 11:30 - 21:00 20:40 라스트오더',
            '목: 11:30 - 21:00 20:40 라스트오더',
            '금: 11:30 - 21:00 20:40 라스트오더',
        ],
        latitude: '37.4996',
        longitude: '126.9286',
        positiveKeywords: '진한 육수, 고소한 맛, 푸짐한 고명',
        reviewSummary: '진한 육수와 고소한 맛, 고명이 푸짐합니다. 가격이 비싸고 면이 평범하다는 의견도 있습니다.',
        positiveRatio: '68',
        nagativeRatio: '32',
    },
    {
        id: 2,
        image: '',
        keyword: '서울시 냉면',
        name: '맛있는 알고리즘',
        address: '서울 종로구 광화문로 1길 234 5층',
        rating: 4.5,
        category: '냉면',
        reviewCount: '999',
        nearbyStation: '2,5호선 을지로9가역 1번 출구에서 239m',
        phone: '02-1234-5678',
        businessHours: [
            '토: 11:30 - 21:00 20:40 라스트오더',
            '일: 11:30 - 21:00 20:40 라스트오더',
            '월: 정기휴무 (매주 월요일)',
            '화: 11:30 - 21:00 20:40 라스트오더',
            '수: 11:30 - 21:00 20:40 라스트오더',
            '목: 11:30 - 21:00 20:40 라스트오더',
            '금: 11:30 - 21:00 20:40 라스트오더',
        ],
        latitude: '37.4998',
        longitude: '126.9280',
        positiveKeywords: '진한 육수, 고소한 맛, 푸짐한 고명',
        reviewSummary: '진한 육수와 고소한 맛, 고명이 푸짐합니다. 가격이 비싸고 면이 평범하다는 의견도 있습니다.',
        positiveRatio: '68',
        nagativeRatio: '32',
    },
    {
        id: 3,
        name: '해물포차꼴통2호점',
        latitude: '37.4991',
        longitude: '126.9289',
    },
    {
        id: 4,
        name: '일진아구찜',
        latitude: '37.4938',
        longitude: '126.9246',
    },
    {
        id: 5,
        name: '즉석 바지락손칼국수',
        latitude: '37.5000',
        longitude: '126.9295',
    },
];
const WebMap = () => {
    const isStoreList = true;
    const categoryState = true; //임시로 현재 state

    //const {id } = useParams();
    //const {item} = data;
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
            {isStoreList && <StoreList data={data} />}
            <ContentsContainer>
                {!isStoreList && (
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
                    <button>1</button>
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
    flex: 1 1 auto;
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
    @media screen and (max-width: 1024px) {
        //width: 100px;
        display: none;
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
