import styled from 'styled-components';
import { MyMap } from '../components/common';
import { MainHeader } from '../components/main';
import { ReactComponent as Arrow } from '../assets/Icon/Arrow.svg';
import { ReactComponent as Pizza } from '../assets/image/Pizza.svg';
import { ReactComponent as Cake } from '../assets/image/Cake.svg';
import { ReactComponent as Sandwich } from '../assets/image/Sandwich.svg';
import { ReactComponent as Pasta } from '../assets/image/Pasta.svg';
import { ReactComponent as OriginalImage } from '../assets/image/MainImage.svg';
import { DartkGrey, Grey, Orange, White } from '../color';
import { Category } from '../components/common';
import { useNavigate } from 'react-router-dom';
const Main = () => {
    const navigate = useNavigate();
    const categoryClickHandler = () => {
        navigate('/webmap');
    };
    const listClickHandler = () => {
        navigate('/webmap/storeList/1');
    };
    return (
        <MainPageLayout>
            <MainHeader />
            <Image />
            <ContentsBox>
                <CategoryBox>
                    <CategoryHeader>
                        <p>카테고리</p>
                        <DetailBox onClick={categoryClickHandler}>
                            <p>View All</p>
                            <Arrow />
                        </DetailBox>
                    </CategoryHeader>
                    <Category position="relative" />
                </CategoryBox>
                <MapBox>
                    <MyMap />
                </MapBox>
            </ContentsBox>
            <MobileContents>
                <StoreListPreview>
                    <Pizza />
                    <Cake />
                    <Sandwich />
                    <Pasta />
                    <div onClick={listClickHandler}>
                        <Arrow />
                        <p>view all</p>
                    </div>
                </StoreListPreview>
            </MobileContents>
        </MainPageLayout>
    );
};
export default Main;

const MainPageLayout = styled.div`
    margin: 0;
`;

const ContentsBox = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    flex-direction: row;
    justify-content: space-between;
    gap: 40px;
    :last-child {
        margin-left: 20px;
    }
    @media screen and (max-width: 1024px) {
        flex-direction: column;
        :last-child {
            margin-left: 0px;
        }
        gap: 0px;
        height: 500px;
        justify-content: center;
        width: 100%;
    }
`;
const CategoryBox = styled.div`
    width: 50%;
    align-items: center;
    height: auto;
    justify-content: center;
    @media screen and (max-width: 1024px) {
        display: flex;
        //position: inherit;
        flex-direction: row;
        width: 100%;
        height: 70px;
        overflow: hidden;
        align-items: flex-start;
        margin-top: 10px;
        & > p {
            text-align: center;
            width: 100px;
            padding-top: 0px;
        }
    }
`;
const CategoryHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    width: 100%;
    border-bottom: solid 2px ${Grey};
    margin: 20px;
    & > p {
        width: 100px;
        font-weight: 600;
        font-size: 20px;
    }
    @media screen and (max-width: 1024px) {
        & > p {
            width: 60px;
            font-weight: 400;
            font-size: 16px;
        }
        margin: 0px;
        gap: 10px;
        justify-content: center;
        border: none;
    }
`;
const DetailBox = styled.button`
    display: flex;
    flex-direction: row;
    align-items: center;
    & > p {
        color: ${DartkGrey};
        font-size: 16px;
        &:hover {
            color: ${Orange};
        }
    }
    gap: 15px;
    font-size: 20px;
    background-color: ${White};
    cursor: pointer;
    @media screen and (max-width: 1024px) {
        & > p {
            display: none;
        }
    }
`;
const MapBox = styled.div`
    width: 50%;
    height: 100%;
    margin: 0;
    @media screen and (max-width: 1024px) {
        width: 100%;
        height: 400px;
    }
`;

const Image = styled(OriginalImage)`
    width: 100%;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    display: block;
    @media screen and (max-width: 1024px) {
        display: none;
    }
`;
const MobileContents = styled.div`
    @media screen and (min-width: 1024px) {
        display: none;
    }
    @media screen and (max-width: 1024px) {
        width: 100%;
        height: 300px;
        background-color: ${White};
    }
`;
const StoreListPreview = styled.div`
    display: none;
    @media screen and (max-width: 1024px) {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 10px;
        width: 100%;
        height: 100px;
        & > svg {
            width: 75px;
            height: 75px;
        }
        & > div {
            & > p {
                color: ${Orange};
            }
            display: flex;
            flex-direction: column;
            gap: 10px;
            align-items: center;
            justify-content: center;
        }
        border-bottom: 1px solid ${Orange};
    }
`;
