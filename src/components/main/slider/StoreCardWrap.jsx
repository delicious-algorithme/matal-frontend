import styled from 'styled-components';
import { StoreCard } from '../../storeCard';
import { Orange } from '../../../color';

const StoreCardWrapper = ({ ranking, store, index }) => {
    return (
        <CardWrapper>
            {ranking && <RankingText>{index + 1}</RankingText>}
            <StoreCard
                image={store.imageUrls}
                address={store.address}
                storeId={store.storeId}
                alt="top-store"
                positiveRatio={store.positiveRatio}
                keyword={store.positiveKeywords}
                name={store.name}
            />
        </CardWrapper>
    );
};
export default StoreCardWrapper;

const RankingText = styled.p`
    color: ${Orange};
    font-weight: bold;
    font-size: 24px;
`;

const CardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
