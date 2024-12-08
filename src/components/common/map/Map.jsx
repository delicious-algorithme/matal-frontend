import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useStoreList, useStoreDetail } from '../../../store';
import MarkerContents from './MarkerContents';
import { Grey, White } from '../../../color';

const MyMap = () => {
    const navigate = useNavigate();
    const mapElement = useRef(null);
    const mapRef = useRef(null);
    const markersRef = useRef([]);

    const { storeList } = useStoreList();
    const { storeDetail, isStoreDetailPage } = useStoreDetail();

    const [currentLocation, setCurrentLocation] = useState({
        lat: '37.5665',
        lng: '126.9780',
    });

    useEffect(() => {
        if (isStoreDetailPage) {
            setCurrentLocation({
                lat: storeDetail.latitude,
                lng: storeDetail.longitude,
            });
        } else if (!isStoreDetailPage && storeList.length !== 0) {
            setCurrentLocation({
                lat: storeList[0].latitude,
                lng: storeList[0].longitude,
            });
        }
    }, [storeList, storeDetail, isStoreDetailPage]);

    const markerClickHandler = useCallback(
        (id) => {
            if (isStoreDetailPage) {
                window.location.href = storeDetail.storeLink;
            } else if (!isStoreDetailPage) {
                navigate(`/webmap/storeDetail/${id}`, { state: { detailVisible: true } });
            }
        },
        [navigate, storeDetail, isStoreDetailPage]
    );

    const { naver } = window;
    let mapOptions = {};

    if (currentLocation.lat !== 0 && currentLocation.lng !== 0) {
        mapOptions = {
            center: new naver.maps.LatLng(currentLocation.lat, currentLocation.lng),
            zoomControlOptions: {
                position: naver.maps.Position.TOP_RIGHT,
            },
            mapDataControl: true,
            scaleControl: true,
            maxZoom: 20,
            zoom: 12,
        };
    }

    useEffect(() => {
        mapRef.current = new naver.maps.Map(mapElement.current, mapOptions);
        markersRef.current.forEach((marker) => marker.setMap(null));
        markersRef.current = [];

        const addMarker = (id, name, positiveKeywords, imageUrls, rating, lat, lng) => {
            try {
                const newMarker = new naver.maps.Marker({
                    position: new naver.maps.LatLng(lat, lng),
                    map: mapRef.current,
                    title: name,
                    clickable: true,
                    icon: {
                        url: 'https://wnstn6945.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F499f229c-bff2-4c82-ae94-81c36fa59a9c%2F207bae82-72cc-4a5d-86e0-0ec55d24d9bc%2Flocation_(3).svg?table=block&id=8e914cbf-ecb5-48da-8467-a201dc304f3b&spaceId=499f229c-bff2-4c82-ae94-81c36fa59a9c&userId=&cache=v2',
                        size: new naver.maps.Size(60, 60),
                        origin: new naver.maps.Point(0, 0),
                        anchor: new naver.maps.Point(11, 35),
                        animation: naver.maps.Animation.DROP,
                    },
                });
                markersRef.current.push(newMarker);
                naver.maps.Event.addListener(newMarker, 'click', () => markerClickHandler(id));

                const infoWindow = new naver.maps.InfoWindow({
                    content: MarkerContents({ name, positiveKeywords, imageUrls, rating }),
                    borderColor: `${Grey}`,
                    backgroundColor: `${White}`,
                    anchorColor: `${White}`,
                });

                naver.maps.Event.addListener(newMarker, 'click', () => markerClickHandler(id));
                naver.maps.Event.addListener(newMarker, 'mouseover', () => {
                    infoWindow.open(mapRef.current, newMarker);
                });
                naver.maps.Event.addListener(newMarker, 'mouseout', () => {
                    infoWindow.close();
                });
            } catch (e) {
                console.log(e);
            }
        };

        const addMarkers = () => {
            if (!isStoreDetailPage && storeList.length !== 0) {
                for (let i = 0; i < storeList.length; i++) {
                    let markerObj = storeList[i];
                    addMarker(
                        markerObj.storeId,
                        markerObj.name,
                        markerObj.positiveKeywords,
                        markerObj.imageUrls,
                        markerObj.rating,
                        markerObj.latitude,
                        markerObj.longitude
                    );
                }
            } else if (isStoreDetailPage) {
                let markerObj = storeDetail;
                addMarker(
                    markerObj.storeId,
                    markerObj.name,
                    markerObj.positiveKeywords,
                    markerObj.imageUrls,
                    markerObj.rating,
                    markerObj.latitude,
                    markerObj.longitude
                );
            }
        };

        addMarkers();

        import('./cluster').then(({ MarkerClustering }) => {
            const htmlMarker1 = {
                content:
                    '<div style="cursor:pointer;width:40px;height:40px;background:#EA6A12;opacity:30%;border-radius:100px;"></div>',
                size: new naver.maps.Size(40, 40),
                anchor: new naver.maps.Point(37, 37),
            };
            const htmlMarker2 = {
                content:
                    '<div style="cursor:pointer;width:75px;height:75px;background:#EA6A12;opacity:30%;border-radius:100px;"></div>',
                size: new naver.maps.Size(75, 75),
                anchor: new naver.maps.Point(37, 37),
            };
            const htmlMarker3 = {
                content:
                    '<div style="cursor:pointer;width:150px;height:150px;background:#EA6A12;opacity:30%;border-radius:100px;"></div>',
                size: new naver.maps.Size(150, 150),
                anchor: new naver.maps.Point(37, 37),
            };

            new MarkerClustering({
                minClusterSize: 3,
                maxZoom: 20,
                map: mapRef.current,
                markers: markersRef.current,
                disableClickZoom: false,
                gridSize: 120,
                icons: [htmlMarker1, htmlMarker2, htmlMarker3],
                indexGenerator: [1, 5, 20],
            });
        });
        // eslint-disable-next-line
    }, [currentLocation.lat, currentLocation.lng, markerClickHandler, storeList, isStoreDetailPage, storeDetail]);

    return <MapContatiner id="map" ref={mapElement} style={{ width: '100%', height: '100%' }} />;
};

export default MyMap;

const MapContatiner = styled.div`
    border-radius: 20px;
`;
