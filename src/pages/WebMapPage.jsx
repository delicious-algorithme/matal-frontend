import styled from 'styled-components';
import { StoreList, MyMap } from '../components/common';
import { LightGrey } from '../color';
import { useStoreDetail } from '../store';

const WebMap = () => {
    const { toggleStoreDetailPage, isStoreDetailPage } = useStoreDetail();

    if (isStoreDetailPage) {
        toggleStoreDetailPage();
    }

    return (
        <WebMapLayout>
            <StoreList />
            <ContentsContainer>
                <MapContainer>
                    <MyMap />
                </MapContainer>
            </ContentsContainer>
        </WebMapLayout>
    );
};

export default WebMap;

const WebMapLayout = styled.div`
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;
`;

const ContentsContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100%;
    @media screen and (max-width: 500px) {
        display: none;
    }
`;

const MapContainer = styled.div`
    max-width: 100%;
    flex: 1 1;
    margin: 0;
    display: flex;
    flex-direction: row;
    background: ${LightGrey};
`;
