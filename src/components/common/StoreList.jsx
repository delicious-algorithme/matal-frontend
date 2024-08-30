import styled from 'styled-components';
import { Grey, Orange, White } from '../../color';
import { ReactComponent as SearchIcon } from './../../assets/Icon/Feather Icon.svg';
import StoreCard from './StoreCard';
import { useEffect, useState } from 'react';
import { ReactComponent as SortReview } from '../../assets/Icon/ReviewSort.svg';
import { ReactComponent as SortPositive } from '../../assets/Icon/SortPositive.svg';
import { getStoreList } from '../../apis/api/storeList';
import { getStoreAll } from '../../apis/api/storeList';
import { useParams } from 'react-router-dom';
import { useStoreList } from '../../store';
import { useIsFirst } from '../../store';
const items = [
    '한정식',
    '일식당',
    '양식',
    '중식당',
    '카페,디저트',
    '베이커리',
    '칼국수,만두',
    '냉면',
    '기사식당',
    '한식',
    '백반,가정식',
    '생선구이',
    '육류,고기요리',
    '두부요리',
    '국밥',
    '주꾸미요리',
    '정육식당',
    '보리밥',
    '요리주점',
    '찌개,전골',
    '닭갈비',
    '맥주,호프',
    '인도음식',
    '카레',
    '초밥,롤',
    '돈가스',
    '떡볶이',
    '종합분식',
    '조개요리',
    '일본식라면',
    '덮밥',
    '베트남음식',
    '양꼬치',
    '생선회',
    '순대,순댓국',
    '샤브샤브',
    '이탈리아음식',
    '스파게티,파스타전문',
    '이자카야',
    '돼지고기구이',
    '태국음식',
    '아시아음식',
];

const StoreList = ({ station }) => {
    const [stores, setStores] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const { keyword } = useParams();
    const [storeName, setStoreName] = useState();
    const [storeCategory, setStoreCategory] = useState();
    const [stationInput, setStationInput] = useState(station);
    const [keywords, setKeywords] = useState('');
    const [sortBy, setSortBy] = useState();
    const [isNothing, setIsNothing] = useState(false);
    const { setStoreList } = useStoreList();
    const { isFirst, setNotIsFirst } = useIsFirst();
    const fetchStoreData = async (storeCategory, storeName, station, keywords, sortBy, page) => {
        setIsLoading(true);
        setHasMore(true);
        if (isFirst) {
            return;
        }
        if (!storeCategory && !storeName && !station && !keywords) {
            return;
        }
        const params = {};
        if (storeCategory) params.category = storeCategory;
        if (storeName) params.name = storeName;
        if (station) params.nearby_station = station;
        if (sortBy) params.sortBy = sortBy;
        if (keywords) params.keywords = keywords;
        params.page = page;
        params.sortOrder = 'DESC';
        try {
            const response = await getStoreList(params);
            const newData = response.data;
            const status = response.status;
            if (status === 200 && newData.length === 0) {
                setIsNothing(true);
                setHasMore(false);
                setIsLoading(false);
                return;
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
        const newData = response.data;
        if (response.status === 200) {
            setIsLoading(false);
        }
        if (response.status === 500) {
            setHasMore(false);
            setIsLoading(false);
        } else if (newData.length < 10) {
            setHasMore(false);
            setIsLoading(false);
        } else if (newData.length === 0) {
            setHasMore(false);
        }
        setStores((prevData) => {
            const newDataFiltered = newData.filter(
                (newItem) => !prevData.some((prevItem) => prevItem.id === newItem.id)
            );
            return [...prevData, ...newDataFiltered];
        });
    };
    useEffect(() => {
        setPage(0);
        setStores([]);
        isFirst && fetchStoreAll(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        setPage(0);
        setStores([]);
        fetchStoreData(storeCategory, storeName, station, keywords, sortBy, 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [station]);
    useEffect(() => {
        if (keyword && typeof keyword === 'string') {
            if (items.includes(keyword)) {
                setStoreCategory(keyword);
                setPage(0);
                setStores([]);
                fetchStoreData(keyword, storeName, station, keywords, sortBy, 0);
            } else {
                setStoreName(keyword);
                setPage(0);
                setStores([]);
                fetchStoreData(storeCategory, keyword, station, keywords, sortBy, 0);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyword, storeCategory]);
    useEffect(() => {
        const updatedStores = stores;
        setStoreList(updatedStores);
    }, [stores, setStoreList]);
    const nameChangeHandler = (e) => {
        setStoreName(e.target.value);
    };
    const stationChangeHandler = (e) => {
        setStationInput(e.target.value);
    };
    const keywordsChangeHandler = (e) => {
        setKeywords(e.target.value);
    };
    const onKeyDownHandler = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setNotIsFirst();
            setPage(0);
            setStores([]);
            const { name } = e.target;
            if (name === 'name') fetchStoreData(storeCategory, e.target.value, station, keywords, sortBy, 0);
            else if (name === 'station') fetchStoreData(storeCategory, storeName, e.target.value, keywords, sortBy, 0);
            else if (name === 'keywords') {
                fetchStoreData(storeCategory, storeName, station, keywords, sortBy, 0);
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
        fetchStoreData(storeCategory, storeName, stationInput, keywords, sortBy, 0);
        if (page !== 0) {
            setPage(0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortBy]);
    useEffect(() => {
        if (!isFirst && hasMore) {
            fetchStoreData(storeCategory, storeName, stationInput, keywords, sortBy, page);
        } else if (isFirst) {
            fetchStoreAll(page);
        } else {
            setHasMore(false);
        }
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
                    name="name"
                    placeholder="이름으로 검색..."
                    onChange={nameChangeHandler}
                    onKeyDown={onKeyDownHandler}
                    value={storeName}
                />
            </SearchBarBox>
            <SearchBarBox>
                <Icon>
                    <SearchIcon />
                </Icon>
                <input
                    type="text"
                    name="station"
                    placeholder="지하철역으로 검색..."
                    onChange={stationChangeHandler}
                    onKeyDown={onKeyDownHandler}
                    value={stationInput}
                />
            </SearchBarBox>
            <SearchBarBox>
                <Icon>
                    <SearchIcon />
                </Icon>
                <input
                    type="text"
                    name="keyword"
                    placeholder="키워드로 검색..."
                    onChange={keywordsChangeHandler}
                    onKeyDown={onKeyDownHandler}
                    value={keywords}
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
                            name={store.name}
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
