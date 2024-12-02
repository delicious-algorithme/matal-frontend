import styled from 'styled-components';
import { MyMap } from '../common';
import { DarkGrey } from '../../color';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { LocationButton } from '../common';

const StoreMap = ({ store }) => {
    const pathClickHandler = () => {
        window.location.href = store.storeLink;
    };

    return (
        <StoreMapContainer>
            <div>
                <p>
                    <PlaceOutlinedIcon />
                    {store.address}
                </p>
                <Staition>{store.nearbyStation}</Staition>
            </div>
            <MapBox>
                <MyMap />
            </MapBox>
            <StaitionBox>
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
    padding-bottom: 30px;

    & > div {
        display: flex;
        gap: 5px;
        justify-content: center;
        flex-direction: column;
        & > p > svg {
            color: ${DarkGrey};
            width: 16px;
            height: 15px;
        }
    }
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
    font-size: 14px;
    color: ${DarkGrey};
`;
