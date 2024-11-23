import React from 'react';
import styled from 'styled-components';
import DetailBox from './DetailBox';
import { Orange, Grey } from '../../color';

const StoreOverview = ({ store }) => {
    if (!store || Object.keys(store).length === 0) {
        return <p>로딩 중...</p>;
    }

    return (
        <StoreOverviewBox>
            <ContentBox>
                <h3>식당 정보</h3>
                <DetailContainer>
                    <DetailBox label="전화" content={store.phone} />
                    <DetailBox label="위치" type="address" content={store.address} />
                    <DetailBox label="영업 시간" type="time" content={store.businessHours} />
                    <DetailBox label="인근 역" content={store.nearbyStation} />
                </DetailContainer>
            </ContentBox>
        </StoreOverviewBox>
    );
};

export default StoreOverview;

const StoreOverviewBox = styled.div`
    & > h3 {
        color: ${Orange};
    }
`;

const ContentBox = styled.div`
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    border: 1px solid ${Grey};
    border-radius: 10px;
    margin-bottom: 20px;

    @media screen and (max-width: 1024px) {
        margin-bottom: 0px;
    }
`;

const DetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;
