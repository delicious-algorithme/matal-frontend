import styled from 'styled-components';
import { Grey, Orange, White } from '../../color';
import { ReactComponent as SearchIcon } from './../../assets/Icon/Feather Icon.svg';
import StoreCard from './StoreCard';
import { useEffect, useState } from 'react';
import { ReactComponent as SortReview } from '../../assets/Icon/ReviewSort.svg';
import { ReactComponent as SortPositive } from '../../assets/Icon/SortPositive.svg';
import { getStoreList } from '../../apis/api/storeList';
import { useParams } from 'react-router-dom';
import { useStoreList } from '../../store';

const StoreList = ({ station }) => {
    const [stores, setStores] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const { keyword } = useParams();
    const [storeName, setStoreName] = useState();
    const [storeCategory, setStoreCategory] = useState();
    const [stationInput, setStationInput] = useState(station);
    const [sortBy, setSortBy] = useState();
    const [isNothing, setIsNothing] = useState(false);
    const { setStoreList } = useStoreList();
    const fetchStoreData = async (storeCategory, storeName, station, sortBy, page) => {
        setIsLoading(true);
        setIsNothing(true);
        setHasMore(true);
        const params = {};
        if (storeCategory) params.category = storeCategory;
        if (storeName) params.name = storeName;
        if (station) params.nearby_station = station;
        if (sortBy) params.sortBy = sortBy;
        params.pahe = page;
        params.sortOrder = 'lower';
        try {
            const response = await getStoreList(params);
            const newData = response.data;
            if (newData.length < 10) {
                setHasMore(false);
                setIsLoading(false);
            }
            if (newData.length === 0) {
                setIsNothing(true);
                setIsLoading(false);
                return newData; //그냥 데이터가 없을 때
            } else {
                setStores((prevData) => {
                    const newDataFiltered = newData.filter(
                        (newItem) => !prevData.some((prevItem) => prevItem.id === newItem.id)
                    );
                    return [...prevData, ...newDataFiltered];
                });
            }
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    };
    useEffect(() => {});
    useEffect(() => {
        setPage(0);
        setStores([]);
        fetchStoreData(storeCategory, storeName, station, sortBy, 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [station]);
    useEffect(() => {
        if (keyword && typeof keyword === 'string') {
            setStoreCategory(keyword);
            setPage(0);
            setStores([]);
            fetchStoreData(keyword, storeName, station, sortBy, 0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyword, storeCategory]);
    useEffect(() => {
        const updatedStores = stores;
        setStoreList(updatedStores); // stores가 바뀔 때마다 storeList를 업데이트
    }, [stores, setStoreList]);
    // input 값 변경시 실행
    const nameChangeHandler = (e) => {
        setStoreName(e.target.value);
    };
    const nameKeyDownHandler = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setPage(0);
            setStores([]);
            fetchStoreData(storeCategory, e.target.value, station, sortBy, 0);
        }
    };
    const stationChangeHandler = (e) => {
        setStationInput(e.target.value);
    };
    const stationKeyDownHandler = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (e.target.value) {
                setPage(0);
                setStores([]);
                fetchStoreData(storeCategory, storeName, stationInput, sortBy, 0);
            }
        }
    };
    const sortReviewClickHandler = () => {
        setSortBy();
    };
    const sortPositiveClickHandler = () => {
        setSortBy('positive_ratio');
    };
    useEffect(() => {
        setPage(0);
        setStores([]);
        fetchStoreData(storeCategory, storeName, stationInput, sortBy, 0);
        if (page !== 0) {
            setPage(0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortBy]);
    useEffect(() => {
        hasMore && fetchStoreData(storeCategory, storeName, stationInput, sortBy, page);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);
    const handleObserver = (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
            setPage((prevPage) => prevPage + 1);
        }
    };
    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, {
            threshold: 0,
        });
        const observerTarget = document.getElementById('observer');
        // 관찰 시작
        if (observerTarget) {
            observer.observe(observerTarget);
        }
        return () => {
            if (observerTarget) {
                observer.unobserve(observerTarget);
            }
        };
    }, [page]);
    const onClickHandler = () => {
        //..
    };
    return (
        <StoreListLayout>
            <SearchBarBox>
                <Icon>
                    <SearchIcon />
                </Icon>
                <input
                    type="text"
                    placeholder="이름으로 검색..."
                    onChange={nameChangeHandler}
                    onKeyDown={nameKeyDownHandler}
                    value={storeName}
                />
            </SearchBarBox>
            <SearchBarBox>
                <Icon>
                    <SearchIcon />
                </Icon>
                <input
                    type="text"
                    placeholder="지하철역으로 검색..."
                    onChange={stationChangeHandler}
                    onKeyDown={stationKeyDownHandler}
                    value={stationInput}
                />
            </SearchBarBox>
            <SortBox>
                <p>정렬</p>
                <button onClick={sortReviewClickHandler}>
                    <SortReview />
                    리뷰순
                </button>
                <button onClick={sortPositiveClickHandler}>
                    <SortPositive />
                    긍정 비율 순
                </button>
            </SortBox>
            {stores &&
                stores.map((store) => {
                    return (
                        <StoreCard
                            onClick={onClickHandler}
                            key={store.id}
                            id={store.id}
                            image={store.image_urls}
                            name={store.keyword}
                            address={store.address}
                            rating={store.rating}
                            positiveKeywords={store.positive_keywords}
                            storeLink={store.store_link}
                            positiveRatio={store.positive_ratio}
                        />
                    );
                })}
            {isNothing && stores.length === 0 && <Alert>조건에 맞는 검색어가 없습니다. </Alert>}
            {isLoading && <p>Loading...</p>}
            <div id="observer" style={{ height: '10px' }} />
        </StoreListLayout>
    );
};
export default StoreList;
const StoreListLayout = styled.div`
    position: relative;
    left: 0;
    top: 0;
    z-index: 100;
    padding-bottom: 100px;
    width: 100%;
    background-color: ${White};
    overflow-y: scroll;
    overflow-x: visible;
    @media screen and (max-width: 1024px) {
        width: 600px;
        height: auto;
    }
`;
const SearchBarBox = styled.div`
    margin-top: 20px;
    margin-bottom: 20px;
    margin-right: 30px;
    display: flex;
    gap: 30px;
    text-align: left;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    & > input {
        width: 100%;
        height: 45px;
        border-radius: 30px;
        border: 1px solid ${Orange};
        z-index: 1;
        padding-left: 50px;
        padding-right: 20px;
        font-size: 16px;
        color: ${Orange};
    }
    input::placeholder {
        color: ${Orange};
    }
    @media screen and (max-width: 1024px) {
        margin-left: 20px;
    }
`;
const Icon = styled.div`
    position: absolute;
    z-index: 2;
    padding: 10px 20px;
`;

const SortBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    margin: 10px;
    & > button {
        cursor: pointer;
        display: flex;
        gap: 10px;
        background-color: ${White};
        justify-content: center;
        align-items: center;
        padding: 10px;
        gap: 5px;
        border: 1px solid ${Grey};
        border-radius: 20px;
        &:hover {
            color: ${Orange};
        }
    }
`;

const Alert = styled.h3`
    padding: 14px;
    display: flex;
    font-weight: 400;
    font-size: 15px;
    color: ${Orange};
`;
