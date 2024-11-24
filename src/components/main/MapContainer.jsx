import { MyMap } from '../common';
import styled from 'styled-components';
import { Grey } from '../../color';

const MapContainer = () => {
    return (
        <MapBox>
            <MyMap />
        </MapBox>
    );
};

export default MapContainer;

const MapBox = styled.div`
    height: 300px;
    display: flex;
    justify-content: center;
    flex-direction: row;
    gap: 10px;
    border-radius: 10px;
    width: 40%;
    height: 300px;
    overflow: scroll;
    border-radius: 20px;
    box-shadow: 2px 2px 2px ${Grey};
    padding: 15px;

    @media screen and (max-width: 1024px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 80%;
    }
`;
