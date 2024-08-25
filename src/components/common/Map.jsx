import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useStoreList } from '../../store';
//import { useParams } from 'react-router-dom';

const MyMap = () => {
    const navigate = useNavigate();
    const mapElement = useRef(null);
    const mapRef = useRef(null);
    const markersRef = useRef([]);
    const { storeList } = useStoreList();
    //const { id } = useParams();
    const [currentLocation, setCurrentLocation] = useState({
        lat: '37.5665',
        lng: '126.9780',
    });
    useEffect(() => {
        if (storeList.length > 0) {
            setCurrentLocation({
                lat: storeList[0].latitude,
                lng: storeList[0].longitude,
            });
        } else {
            console.log('Store not found');
        }
    }, [storeList]);
    const markerClickHandler = useCallback(
        (id) => {
            navigate(`/webmap/storeDetail/${id}`, { state: { detailVisible: true } });
        },
        [navigate]
    );
    //clustering
    useEffect(() => {
        const markers = [];
        const { naver } = window;
        const createMarkerList = [];
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
                zoom: 10,
            };
        }
        mapRef.current = new naver.maps.Map(mapElement.current, mapOptions);
        markersRef.current.forEach((marker) => marker.setMap(null));
        markersRef.current = [];
        const addMarker = (id, name, lat, lng) => {
            try {
                const newMarker = new naver.maps.Marker({
                    position: new naver.maps.LatLng(lat, lng),
                    map: mapRef.current,
                    title: name,
                    clickable: true,
                    icon: {
                        content: `<img src="/images/location.svg" />`,
                    },
                });
                markers[id] = newMarker;
                markersRef.current.push(newMarker);
                createMarkerList.push(newMarker);
                naver.maps.Event.addListener(newMarker, 'click', () => markerClickHandler(id));
            } catch (e) {
                console.log('이거 때문이에요');
            }
        };
        const addMarkers = () => {
            for (let i = 0; i < storeList.length; i++) {
                let markerObj = storeList[i];
                const dom_id = markerObj.id;
                const title = markerObj.name;
                const lat = markerObj.latitude;
                const lng = markerObj.longitude;
                addMarker(dom_id, title, lat, lng);
            }
        };
        addMarkers();
        const htmlMarker1 = {
            content:
                '<div style="cursor:pointer;width:40px;height:40px;background:#EA6A12;opacity:30%;border-radius:100px;"></div>',
            size: new naver.maps.Size(40, 40),
            anchor: new naver.maps.Point(20, 20),
        };
        const htmlMarker2 = {
            content:
                '<div style="cursor:pointer;width:75px;height:75px;background:#EA6A12;opacity:30%;border-radius:100px;"></div>',
            size: new naver.maps.Size(75, 75),
            anchor: new naver.maps.Point(37, 37),
        };
        const htmlMarker3 = {
            content:
                '<div style="cursor:pointer;width:160px;height:160px;background:#EA6A12;opacity:30%;border-radius:100px;"></div>',
            size: new naver.maps.Size(160, 160),
            anchor: new naver.maps.Point(80, 80),
        };
        const htmlMarker4 = {
            content:
                '<div style="cursor:pointer;width:200px;height:200px;background:#EA6A12;opacity:30%;border-radius:100px;"></div>',
            size: new naver.maps.Size(200, 200),
            anchor: new naver.maps.Point(100, 100),
        };
        import('./cluster').then(({ MarkerClustering }) => {
            new MarkerClustering({
                minClusterSize: 2,
                maxZoom: 20,
                map: mapRef.current,
                markers: createMarkerList,
                disableClickZoom: false,
                gridSize: 120,
                icons: [htmlMarker1, htmlMarker2, htmlMarker3, htmlMarker4],
                indexGenerator: [1, 5, 10, 100],
            });
        });
    }, [currentLocation.lat, currentLocation.lng, markerClickHandler, storeList]);

    return <MapContatiner id="map" ref={mapElement} style={{ width: '100%', height: '100%' }} />;
};
export default MyMap;

const MapContatiner = styled.div``;
