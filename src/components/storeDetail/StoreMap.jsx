import styled from 'styled-components';
import { MyMap } from '../common';
import { DarkGrey, Orange } from '../../color';
import { LocationOn } from '@mui/icons-material';
import { LocationButton } from '../common';

const StoreMap = ({ store }) => {
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
                <p>{store.nearbyStation}</p>
                <LocationButton />
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
        flex-direction: row;
        align-items: center;
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
    flex-direction: row;
    gap: 10px;
`;
