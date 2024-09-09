import styled from 'styled-components';
import { Grey, Orange, White } from '../../../color';
import { ReactComponent as SearchIcon } from './../../../assets/Icon/Feather Icon.svg';
import StoreCard from './StoreCard';
import { useEffect, useState } from 'react';
import { ReactComponent as SortReview } from '../../../assets/Icon/ReviewSort.svg';
import { ReactComponent as SortPositive } from '../../../assets/Icon/SortPositive.svg';
import { getStoreList } from '../../../apis/api/getStoreList';
import { getStoreAll } from '../../../apis/api/getStoreAll';
import { useParams } from 'react-router-dom';
import { useStoreList, useIsFirst } from '../../../store';
import Filtering from '../filtering/Filtering';
import { items } from '../category/CategoryItems';
const StoreList = ({ station }) => {
    const [stores, setStores] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [isNothing, setIsNothing] = useState(false);
    const [sortBy, setSortBy] = useState('');
    const [storeCategory, setStoreCategory] = useState(null);
    const [storeName, setStoreName] = useState(null);
    const [stationInput, setStatioinInput] = useState(station ? station : null);
    const [storeKeywords, setStoreKeywords] = useState(null);
    const [input, setInput] = useState();
    const categoryParams = {
        name: storeName,
        category: storeCategory,
        station: stationInput,
        keywords: storeKeywords,
        sortBy: sortBy,
        sortOrder: 'DESC',
    };
    const { keyword } = useParams();
    const { setStoreList } = useStoreList();
    const { isFirst, setNotIsFirst } = useIsFirst();

    const fetchStoreData = async (page) => {
        setIsLoading(true);
        setHasMore(true);
        if (
            isFirst ||
            (!categoryParams.station && !categoryParams.category && !categoryParams.name && !categoryParams.keywords)
        )
            return;
        try {
            const response = await getStoreList({ ...categoryParams, page });
            if (response.status === 200) {
                const newData = response.data.content;
                const isLast = response.data.last;
                if (newData) {
                    setIsLoading(false);
                    setStores((prevData) => {
                        const newDataFiltered = newData.filter(
                            (newItem) => !prevData.some((prevItem) => prevItem.storeId === newItem.storeId)
                        );
                        return [...prevData, ...newDataFiltered];
                    });
                }
                if (isLast) {
                    setHasMore(false);
                    setIsLoading(false);
                }
            } else if (response.status === 500) {
                setHasMore(false);
                setIsLoading(false);
                setIsNothing(true);
                console.log('500에러');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    const fetchStoreAll = async (page) => {
        setIsLoading(true);
        setHasMore(true);
        const response = await getStoreAll({
            page: page,
        });
        if (response.status === 200) {
            const newData = response.data.content;
            const isLast = response.data.last;
            if (newData) {
                setIsLoading(false);
                setStores((prevData) => {
                    const newDataFiltered = newData.filter(
                        (newItem) => !prevData.some((prevItem) => prevItem.storeId === newItem.storeId)
                    );
                    return [...prevData, ...newDataFiltered];
                });
            }
            if (isLast) {
                setHasMore(false);
                setIsLoading(false);
            }
        } else if (response.status === 500) {
            setHasMore(false);
            setIsLoading(false);
            setIsNothing(true);
        }
    };

    useEffect(() => {
        setStores([]);
        isFirst && fetchStoreAll(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (keyword && typeof keyword === 'string') {
            if (items.includes(keyword)) {
                setStoreCategory(keyword);
            } else {
                setStoreName(keyword);
            }
        }
    }, [keyword]);
    useEffect(() => {
        if (!isFirst && hasMore) fetchStoreData(page);
        else if (isFirst) fetchStoreAll(page);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);
    const handleInputChange = (e) => {
        setInput(e.target.value);
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const { name } = e.target;
            switch (name) {
                case 'name':
                    setStoreName(e.target.value);
                    break;
                case 'station':
                    setStatioinInput(e.target.value);
                    break;
                case 'keywords':
                    setStoreKeywords(e.target.value);
                    break;
                default:
                    break;
            }
            setNotIsFirst();
        }
    };
    const sortReviewClickHandler = () => {
        setSortBy('rating');
    };
    const sortPositiveClickHandler = () => {
        setSortBy('positive_ratio');
    };
    useEffect(() => {
        setPage(0);
        setStores([]);
    }, [storeName, storeCategory, storeKeywords, sortBy, stationInput]);
    useEffect(() => {
        if (storeCategory || storeName || storeKeywords || stationInput) {
            fetchStoreData(0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storeName, storeCategory, storeKeywords, sortBy, stationInput]);
    useEffect(() => {
        const updatedStores = stores;
        setStoreList(updatedStores);
    }, [stores, setStoreList]);
    const handleObserver = (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    };
    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, {
            threshold: 0,
        });
        const observerTarget = document.getElementById('observer');
        if (observerTarget) {
            observer.observe(observerTarget);
        }
        return () => {
            if (observerTarget) {
                observer.unobserve(observerTarget);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    return (
        <StoreListLayout>
            <Filtering />
            {['name', 'station', 'keywords'].map((field, idx) => (
                <SearchBarBox key={idx}>
                    <Icon>
                        <SearchIcon />
                    </Icon>
                    <input
                        type="text"
                        name={field}
                        placeholder={
                            field === 'name'
                                ? '가게 이름으로 검색...'
                                : field === 'station'
                                  ? '지하철역 이름으로 검색...'
                                  : '키워드로 검색...'
                        }
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        value={input}
                    />
                </SearchBarBox>
            ))}
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
                            key={store.id}
                            id={store.storeId}
                            image={store.imageUrl}
                            name={store.name}
                            address={store.address}
                            rating={store.rating}
                            positiveKeywords={store.positiveKeywords}
                            storeLink={store.storeLink}
                            positiveRatio={store.positiveRatio}
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
