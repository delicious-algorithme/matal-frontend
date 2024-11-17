import React from 'react';
import styled from 'styled-components';
import DetailBox from './DetailBox';
import { Orange, Grey } from '../../color';

const StoreOverview = ({ store }) => {
    if (!store || Object.keys(store).length === 0) {
        return <p>로딩 중...</p>;
    }

    const menues = store.menuAndPrice.split(', ').map((item) => {
        if (item.includes(':')) {
            const [name, price] = item.split(': ');
            return { name, price };
        } else {
            const [name, price] = item.split(' ');
            return { name, price };
        }
    });

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
            <ContentBox>
                <h3>메뉴</h3>
                {menues.map((menu, idx) => {
                    return (
                        <MenuBox key={idx}>
                            <p>{menu.name}</p>
                            <h4>{menu.price}</h4>
                        </MenuBox>
                    );
                })}
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
`;

const DetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const MenuBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;
