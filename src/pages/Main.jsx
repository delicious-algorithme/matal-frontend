import styled from 'styled-components';
import { MyMap } from '../components/common';
import { MainHeader } from '../components/main';
import { ReactComponent as Arrow } from '../assets/Icon/Arrow.svg';
import { ReactComponent as OriginalImage } from '../assets/image/MainImage.svg';
import { DartkGrey, Grey, Orange, White } from '../color';
import { Category } from '../components/common';
const Main = () => {
    return (
        <MainPageLayout>
            <MainHeader />
            <Image />
            <ContentsBox>
                <CategoryBox>
                    <CategoryHeader>
                        <p>카테고리</p>
                        <DetailBox>
                            <p>View All</p>
                            <Arrow />
                        </DetailBox>
                    </CategoryHeader>
                    <Category />
                </CategoryBox>
                <MapBox>
                    <MyMap />
                </MapBox>
            </ContentsBox>
        </MainPageLayout>
    );
};
export default Main;

const MainPageLayout = styled.div`
    margin: 0;
`;

const ContentsBox = styled.div`
    display: flex;
    flex-direction: row;
`;
const CategoryBox = styled.div`
    width: 50%;
    height: auto;
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
        font-weight: 600;
        font-size: 23px;
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
`;
const MapBox = styled.div`
    width: 850px;
    height: auto;
    margin: 0;
`;

const Image = styled(OriginalImage)`
    width: 100%;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    display: block;
`;
