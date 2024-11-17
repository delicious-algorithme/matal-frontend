import styled from 'styled-components';
import { Orange, Grey } from '../../color';
import { ReactComponent as ParkingTip } from '../../assets/Icon/detail/PakingTip.svg';
import { ReactComponent as WaitingTip } from '../../assets/Icon/detail/WaitingTip.svg';

const StoreTip = ({ store }) => {
    return (
        <TipContainer>
            <h4>AI TIP</h4>
            <div>
                <TipBox>
                    <ParkingTip />
                    <h3>주차 꿀팁</h3>
                    <p>{store.parkingTip}</p>
                </TipBox>
                <TipBox>
                    <WaitingTip />
                    <h3>웨이팅 꿀팁</h3>
                    <p>{store.waitingTip}</p>
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

    & > h3 {
        color: ${Orange};
    }
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
`;
