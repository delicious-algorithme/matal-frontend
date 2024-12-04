import styled from 'styled-components';
import { Orange, Grey, DarkGreen, DarkGrey } from '../../color';

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
                    <img
                        src="https://wnstn6945.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F499f229c-bff2-4c82-ae94-81c36fa59a9c%2F813aa260-7f87-478d-8c68-77e2777084cb%2Fmingcute_parking-fill.svg?table=block&id=3688ac76-ae73-42b4-aa63-1d45fcca516e&spaceId=499f229c-bff2-4c82-ae94-81c36fa59a9c&userId=&cache=v2"
                        alt="parking"
                    />
                    <h3>주차 정보</h3>
                    {parkingTips.map((tip, idx) => {
                        return <TipText key={idx}> {tip}</TipText>;
                    })}
                </TipBox>
                <TipBox>
                    <img
                        alt="clock"
                        src="https://wnstn6945.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F499f229c-bff2-4c82-ae94-81c36fa59a9c%2Fea67a4f6-5dea-4ba0-be37-8693bf57b2f3%2Fmdi_clock-outline_(1).svg?table=block&id=bf619bab-6762-4db3-8ef5-9202d9bdee74&spaceId=499f229c-bff2-4c82-ae94-81c36fa59a9c&userId=&cache=v2"
                    />
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

    & > img {
        width: 30px;
        height: 30px;
    }

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
