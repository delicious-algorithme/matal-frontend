import React from 'react';
import styled from 'styled-components';
import { DarkGrey, Grey } from '../../color';

const StoreMenues = ({ store }) => {
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
    );
};

export default StoreMenues;

const ContentBox = styled.div`
    width: 100%;
    padding: 20px;
    display: flex;
    margin-top: 20px;
    flex-direction: column;
    gap: 20px;
    border: 1px solid ${Grey};
    border-radius: 10px;
    margin-bottom: 20px;

    @media screen and (max-width: 500px) {
        & > h3 {
            font-size: 16px;
        }
    }
`;

const MenuBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    & > p {
        color: ${DarkGrey};
        font-size: 15px;
    }
`;
