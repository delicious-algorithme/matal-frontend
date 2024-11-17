import styled from 'styled-components';
import { MyMap } from '../common';
import { DarkGrey } from '../../color';
import { LocationOn } from '@mui/icons-material';
import { LocationButton } from '../common';

const StoreMap = ({ store }) => {
    const pathClickHandler = () => {
        window.location.href = store.storeLink;
    };

    return (
        <StoreMapContainer>
            <div>
                <LocationOn />
                <p>{store.address}</p>
            </div>
            <MapBox>
                <MyMap />
            </MapBox>
            <StaitionBox>
                <Staition>{store.nearbyStation}</Staition>
                <LocationButton pathClickHandler={pathClickHandler} />
            </StaitionBox>
        </StoreMapContainer>
    );
};

export default StoreMap;

const StoreMapContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;

    & > div {
        display: flex;
        gap: 5px;
        & > svg {
            color: ${DarkGrey};
        }
    }
    padding-bottom: 30px;
`;

const MapBox = styled.div`
    border-radius: 20px;
    width: 100%;

    height: 300px;

    & > div {
        border-radius: 20px;
    }
`;

const StaitionBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Staition = styled.p`
    width: 100%;
`;
