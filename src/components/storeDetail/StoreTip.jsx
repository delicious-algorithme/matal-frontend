import styled from 'styled-components';
import { Orange, Grey, DarkGreen, DarkGrey } from '../../color';
import { ReactComponent as ParkingTip } from '../../assets/Icon/detail/PakingTip.svg';
import { ReactComponent as WaitingTip } from '../../assets/Icon/detail/WaitingTip.svg';

const StoreTip = ({ store }) => {
    if (!store || Object.keys(store).length === 0) {
        return <p>로딩 중...</p>;
    }

    const parkingTips = store.parkingTip.includes(',') ? store.parkingTip.split(',') : [store.parkingTip];
    const waitingTips = store.waitingTip.includes(',') ? store.waitingTip.split(',') : [store.waitingTip];

    return (
        <TipContainer>
            <h4>AI 정보</h4>
            <div>
                <TipBox>
                    <ParkingTip />
                    <h3>주차 정보</h3>
                    {parkingTips.map((tip, idx) => {
                        return <TipText key={idx}> {tip}</TipText>;
                    })}
                </TipBox>
                <TipBox>
                    <WaitingTip />
                    <h3>웨이팅 정보</h3>
                    {waitingTips.map((tip, idx) => {
                        return <TipText key={idx}> {tip}</TipText>;
                    })}
                </TipBox>
            </div>
        </TipContainer>
    );
};

export default StoreTip;

const TipContainer = styled.div`
    display: flex;
    padding: 20px;
    flex-direction: column;
    gap: 20px;
    width: 100%;

    & > div {
        display: flex;
        flex-direction: row;
        gap: 30px;
    }
    @media screen and (max-width: 1024px) {
        & > div > div {
            min-width: 100px;
        }
    }
`;

const TipBox = styled.div`
    width: 100%;
    height: 200px;
    display: flex;
    gap: 10px;
    border-radius: 20px;
    border: 1px solid ${Orange};
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    box-shadow: 2px 2px 2px ${Grey};
    & > h3 {
        color: ${DarkGreen};
    }

    @media screen and (max-width: 500px) {
        & > h3 {
            font-size: 16px;
        }
        font-size: 14px;
    }
`;

const TipText = styled.p`
    color: ${DarkGrey};
`;
