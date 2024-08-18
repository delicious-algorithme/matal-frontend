import React, { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
//신대방 삼거리역 임시 데이터 설정 -> 지하철역

const data = [
    {
        id: 1,
        image: '',
        keyword: '서울시 냉면',
        name: '맛있는 알고리즘',
        address: '서울 종로구 광화문로 1길 234 5층',
        rating: 4.5,
        category: '냉면',
        reviewCount: '999',
        nearbyStation: '2,5호선 을지로9가역 1번 출구에서 239m',
        phone: '02-1234-5678',
        businessHours: [
            '토: 11:30 - 21:00 20:40 라스트오더',
            '일: 11:30 - 21:00 20:40 라스트오더',
            '월: 정기휴무 (매주 월요일)',
            '화: 11:30 - 21:00 20:40 라스트오더',
            '수: 11:30 - 21:00 20:40 라스트오더',
            '목: 11:30 - 21:00 20:40 라스트오더',
            '금: 11:30 - 21:00 20:40 라스트오더',
        ],
        latitude: '37.4996',
        longitude: '126.9286',
        positiveKeywords: '진한 육수, 고소한 맛, 푸짐한 고명',
        reviewSummary: '진한 육수와 고소한 맛, 고명이 푸짐합니다. 가격이 비싸고 면이 평범하다는 의견도 있습니다.',
        positiveRatio: '68',
        nagativeRatio: '32',
    },
    {
        id: 2,
        image: '',
        keyword: '서울시 냉면',
        name: '맛있는 알고리즘',
        address: '서울 종로구 광화문로 1길 234 5층',
        rating: 4.5,
        category: '냉면',
        reviewCount: '999',
        nearbyStation: '2,5호선 을지로9가역 1번 출구에서 239m',
        phone: '02-1234-5678',
        businessHours: [
            '토: 11:30 - 21:00 20:40 라스트오더',
            '일: 11:30 - 21:00 20:40 라스트오더',
            '월: 정기휴무 (매주 월요일)',
            '화: 11:30 - 21:00 20:40 라스트오더',
            '수: 11:30 - 21:00 20:40 라스트오더',
            '목: 11:30 - 21:00 20:40 라스트오더',
            '금: 11:30 - 21:00 20:40 라스트오더',
        ],
        latitude: '37.4998',
        longitude: '126.9280',
        positiveKeywords: '진한 육수, 고소한 맛, 푸짐한 고명',
        reviewSummary: '진한 육수와 고소한 맛, 고명이 푸짐합니다. 가격이 비싸고 면이 평범하다는 의견도 있습니다.',
        positiveRatio: '68',
        nagativeRatio: '32',
    },
    {
        id: 3,
        name: '해물포차꼴통2호점',
        latitude: '37.4991',
        longitude: '126.9289',
    },
    {
        id: 4,
        name: '일진아구찜',
        latitude: '37.4938',
        longitude: '126.9246',
    },
    {
        id: 5,
        name: '즉석 바지락손칼국수',
        latitude: '37.5000',
        longitude: '126.9295',
    },
];

const MyMap = () => {
    //const [newMap, setNewMap] = useState();
    const navigate = useNavigate();
    const mapElement = useRef(null);
    const mapRef = useRef(null);
    const currentLocation = {
        lat: data[0].latitude,
        lng: data[0].longitude,
    };
    const markerClickHandler = useCallback(
        (id) => {
            navigate(`/webmap/storeDetail/${id}`);
        },
        [navigate]
    );
    useEffect(() => {
        const { naver } = window;
        let mapOptions = {};
        if (currentLocation.lat !== 0 && currentLocation.lng !== 0) {
            mapOptions = {
                center: new naver.maps.LatLng(currentLocation.lat, currentLocation.lng),
                zoomControl: true,
                zoomControlOptions: {
                    style: naver.maps.ZoomControlStyle.SMALL,
                    position: naver.maps.Position.TOP_RIGHT,
                },
                mapDataControl: true,
                scaleControl: true,
                maxZoom: 20,
                zoom: 18,
            };
        }
        mapRef.current = new naver.maps.Map(mapElement.current, mapOptions);
        //setNewMap(map);
        const addMarker = (id, name, lat, lng) => {
            const { naver } = window;
            const createMarkerList = [];
            try {
                let newMarker = new naver.maps.Marker({
                    position: new naver.maps.LatLng(lat, lng),
                    map: mapRef.current,
                    title: name,
                    clickable: true,
                    icon: {
                        content: `<img src="/images/location.svg" />`,
                    },
                });
                // console.log('process...');
                newMarker.setTitle(name);
                createMarkerList.push(newMarker);
                naver.maps.Event.addListener(newMarker, 'click', () => markerClickHandler(id));
            } catch (e) {}
        };
        const addMarkers = () => {
            for (let i = 0; i < data.length; i++) {
                let markerObj = data[i];
                const dom_id = markerObj.id;
                const title = markerObj.name;
                const lat = markerObj.latitude;
                const lng = markerObj.longitude;
                addMarker(dom_id, title, lat, lng);
            }
        };
        addMarkers();
    }, [currentLocation.lat, currentLocation.lng, markerClickHandler]);

    return <MapContatiner id="map" ref={mapElement} style={{ width: '100%', height: '100%' }} />;
};
export default MyMap;

const MapContatiner = styled.div``;
