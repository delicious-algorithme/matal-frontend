import styled from 'styled-components';
import PopOver from './PopOver';
import StoreInfoCard from './StoreInfoCard';
import { Orange, Grey } from '../../color';
import PersonIcon from '@mui/icons-material/Person';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import PetsIcon from '@mui/icons-material/Pets';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

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
                    <StoreInfoCard icon={<AccessTimeIcon />} iconColor={Orange} text={`웨이팅 ${tip.isWaiting}`} />
                    <StoreInfoCard icon={<PersonIcon />} iconColor={Orange} text={`혼밥 ${tip.isSoloDining}`} />
                    <StoreInfoCard icon={<LocalParkingIcon />} iconColor={Orange} text={`주차 ${tip.isParking}`} />
                    <StoreInfoCard icon={<PetsIcon />} iconColor={Orange} text={`애견 동반 ${tip.isPetFriendly}`} />
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

    @media screen and (max-width: 500px) {
        & > h2 {
            font-size: 16px;
        }
    }
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

    @media screen and (max-width: 768px) {
        font-size: 14px;
    }
`;

const StoreInfoCardBox = styled.div`
    max-width: 400px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    gap: 10px;
`;
