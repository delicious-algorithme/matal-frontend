import React, { useEffect } from 'react';
import styled from 'styled-components';

const MyMap = () => {
    const currentLocation = {
        lat: 37.3595704,
        lng: 127.105399,
    };
    const { naver } = window;
    useEffect(() => {
        if (currentLocation.lat !== 0 && currentLocation.lng !== 0) {
            const map = new naver.maps.Map('map', {
                center: new naver.maps.LatLng(37.3595704, 127.105399),
                zoomControl: true,
                zoomControlOptions: {
                    style: naver.maps.ZoomControlStyle.SMALL,
                    position: naver.maps.Position.TOP_RIGHT,
                },
                zoom: 10,
            });
        }
    }, [currentLocation]);
    return <MapContatiner id="map" style={{ width: '100%', height: '100%' }} />;
};
export default MyMap;

const MapContatiner = styled.div``;
