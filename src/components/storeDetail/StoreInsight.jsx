import styled from 'styled-components';
import PopOver from './PopOver';
import StoreInfoCard from './StoreInfoCard';
import { Orange, Grey } from '../../color';
import { ReactComponent as Person } from '../../assets/Icon/detail/SoloDining.svg';
import { ReactComponent as Parking } from '../../assets/Icon/detail/Parking.svg';
import { ReactComponent as Dog } from '../../assets/Icon/detail/Dog.svg';
import { ReactComponent as Clock } from '../../assets/Icon/detail/Clock.svg';

const StoreInsight = ({ store }) => {
    const { isSoloDining, isParking, isPetFriendly, isWaiting } = store;

    const tip = {
        isSoloDining: isSoloDining ? '가능' : '불가능',
        isParking: isParking ? '가능' : '불가능',
        isPetFriendly: isPetFriendly ? '가능' : '불가능',
        isWaiting: isWaiting ? '있는' : '없는',
    };

    return (
        <StoreInsightContainer>
            <TitleBox>
                <h2>AI리뷰 인사이트</h2>
                <PopOver
                    label="AI리뷰 인사이트란?"
                    text="AI가 다수의 고객 리뷰를 정밀히 분석하여 숨겨진 인사이트를 찾아줍니다."
                />
            </TitleBox>
            <ContentBox>
                <StoreInfoCardBox>
                    <StoreInfoCard icon={<Clock />} iconColor={Orange} text={`웨이팅 ${tip.isWaiting}`} />
                    <StoreInfoCard icon={<Person />} iconColor={Orange} text={`혼밥 ${tip.isSoloDining}`} />
                    <StoreInfoCard icon={<Parking />} iconColor={Orange} text={`주차 ${tip.isParking}`} />
                    <StoreInfoCard icon={<Dog />} iconColor={Orange} text={`애견 동반 ${tip.isPetFriendly}`} />
                </StoreInfoCardBox>
            </ContentBox>
            <ContentBox>
                <TitleBox>
                    <h3>한 줄 리뷰</h3>
                </TitleBox>
                <p>{store.reviewSummary}</p>
            </ContentBox>
        </StoreInsightContainer>
    );
};

export default StoreInsight;

const StoreInsightContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
`;

const TitleBox = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
`;

const ContentBox = styled.div`
    width: 100%;
    margin-top: 20px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border: 1px solid ${Grey};
    border-radius: 10px;

    & > p {
        font-size: 15px;
    }
`;

const StoreInfoCardBox = styled.div`
    max-width: 400px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    gap: 10px;
`;
