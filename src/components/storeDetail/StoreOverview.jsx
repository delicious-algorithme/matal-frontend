import React from 'react';
import styled from 'styled-components';
import DetailBox from './DetailBox';
import { Orange, Grey } from '../../color';
import { Phone, LocationOn, PunchClock } from '@mui/icons-material';

const StoreOverview = ({ store }) => {
    return (
        <StoreOverviewBox>
            <ContentBox>
                <div>
                    <DetailBox icon={<Phone />} label="전화" content={store.phone} />
                    <DetailBox icon={<LocationOn />} label="위치" type="address" content={store.address} />
                    <DetailBox icon={<PunchClock />} label="영업 시간" type="time" content={store.businessHours} />
                    <DetailBox label="메뉴" content={store.menuAndPrice} />
                </div>
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
    box-shadow: 1px 1px 1px ${Grey};
    border: 1px solid ${Grey};
    border-radius: 10px;

    & > div {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
`;
