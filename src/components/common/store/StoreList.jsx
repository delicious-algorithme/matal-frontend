import styled from 'styled-components';
import { Grey, LightGrey, Orange, White } from '../../../color';
import { ReactComponent as SearchIcon } from './../../../assets/Icon/Feather Icon.svg';
import StoreCard from './StoreCard';
import { useEffect, useState } from 'react';
import { ReactComponent as SortReview } from '../../../assets/Icon/ReviewSort.svg';
import { ReactComponent as SortPositive } from '../../../assets/Icon/SortPositive.svg';
import { getStoreList } from '../../../apis/api/getStoreList';
import { getStoreAll } from '../../../apis/api/getStoreAll';
import { useLocation } from 'react-router-dom';
import { useStoreList, useIsFirst, useFilterParams } from '../../../store';
import Filtering from '../filtering/Filtering';
const StoreList = () => {
    const [stores, setStores] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [isNothing, setIsNothing] = useState(false);

    const [category, setCategory] = useState(null);
    const [input, setInput] = useState();
    const [orderByRating, setOrderByRating] = useState(null);
    const [orderByPositiveRatio, setorderByPositiveRatio] = useState(null);

    const { setStoreList } = useStoreList();
    const { isFirst, setNotIsFirst, setIsFirst } = useIsFirst();
    const { filterParams, setFilterParams } = useFilterParams();

    const Params = {
        ...filterParams,
        searchKeywords: input ? input : null,
        orderByRating: orderByRating,
        orderByPositiveRatio: orderByPositiveRatio,
    };

    const location = useLocation();

    const fetchStoreData = async (page) => {
        setIsLoading(true);
        setHasMore(true);
        setNotIsFirst();
        if (isFirst) return;
        try {
            const response = await getStoreList({ ...Params, page });
            if (response.status === 200) {
                const newData = response.data.content;
                if (newData) {
                    setIsLoading(false);
                    setStores((prevData) => {
                        const newDataFiltered = newData.filter(
                            (newItem) => !prevData.some((prevItem) => prevItem.storeId === newItem.storeId)
                        );
                        return [...prevData, ...newDataFiltered];
                    });
                }
                //비어있는 경우
                if (response.data.empty) {
                    setHasMore(false);
                    setIsLoading(false);
                    setIsNothing(true);
                }
            } else if (
                response.status === 500 ||
                response.status === 400 ||
                response.status.message === 'Network Error'
            ) {
                setHasMore(false);
                setIsLoading(false);
                setIsNothing(true);
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };
    const fetchStoreAll = async (page) => {
        setIsLoading(true);
        setHasMore(true);
        if (page > 100) return;
        try {
            const response = await getStoreAll({
                page: page,
            });
            if (response.status === 200) {
                const newData = response.data.content;
                if (newData) {
                    setIsLoading(false);
                    setStores((prevData) => {
                        const newDataFiltered = newData.filter(
                            (newItem) => !prevData.some((prevItem) => prevItem.storeId === newItem.storeId)
                        );
                        return [...prevData, ...newDataFiltered];
                    });
                }
            } else if (response.status === 500) {
                setHasMore(false);
                setIsLoading(false);
                setIsNothing(true);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (location.state?.searchInput) {
            setInput(location.state?.searchInput);
        } else if (location.state?.category) {
            setCategory(location.state.category);
        }
    }, []);

    const allFetchButtonHandler = () => {
        setStores([]);
        setIsFirst();
        fetchStoreAll(0);
        localStorage.removeItem('tagValue');
        localStorage.removeItem('location');
        localStorage.removeItem('params');
        setFilterParams();
    };

    const _ = require('lodash');
    const isObjectEmpty = (objectName) => {
        return _.isEmpty(objectName);
    };

    useEffect(() => {
        if (!isObjectEmpty(filterParams)) {
            setNotIsFirst();
        }
        setPage(0);
        setStores([]);
        !isFirst && filterParams && fetchStoreData(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterParams, orderByPositiveRatio, orderByRating, category, input]);

    useEffect(() => {
        setStores([]);
        isFirst && fetchStoreAll(0);
        !isFirst && fetchStoreData(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFirst]);

    useEffect(() => {
        const updateStores = stores;
        setStoreList(updateStores);
    }, [stores, setStoreList]);

    useEffect(() => {
        if (!isFirst && hasMore) fetchStoreData(page);
        else if (hasMore) fetchStoreAll(page);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setNotIsFirst();
            setPage(0);
            setStores([]);
            fetchStoreData(0);
        }
    };

    const sortReviewClickHandler = (sortBy) => {
        setOrderByRating(sortBy);
        setorderByPositiveRatio(null);
    };

    const sortPositiveClickHandler = (sortBy) => {
        setorderByPositiveRatio(sortBy);
        setOrderByRating(null);
    };

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
            <h4>검색</h4>
            <SearchBarBox>
                <Icon>
                    <SearchIcon />
                </Icon>
                <input
                    type="text"
                    placeholder="검색어를 입력해주세요..."
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    value={input}
                />
            </SearchBarBox>
            <h4>필터링</h4>
            <button onClick={allFetchButtonHandler}>전체 식당 보기</button>
            <Filtering category={category} />
            <SortBox>
                <p>정렬</p>
                <div>
                    <SortSelectBox>
                        <button>
                            <SortReview />
                            평점순
                        </button>
                        <ul>
                            <li onClick={() => sortReviewClickHandler('asc')}>평점 낮은 순</li>
                            <li onClick={() => sortReviewClickHandler('desc')}>평점 높은 순</li>
                        </ul>
                    </SortSelectBox>
                    <SortSelectBox>
                        <button>
                            <SortPositive />
                            긍정 비율 순
                        </button>

                        <ul>
                            <li onClick={() => sortPositiveClickHandler('asc')}>긍정 비율 낮은 순</li>
                            <li onClick={() => sortPositiveClickHandler('desc')}>긍정 비율 높은 순</li>
                        </ul>
                    </SortSelectBox>
                </div>
            </SortBox>
            {stores &&
                stores.map((store) => {
                    return (
                        <StoreCard
                            key={store.id}
                            id={store.storeId}
                            image={store.imageUrls}
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
    margin-top: 10px;
    padding-bottom: 100px;
    width: 100%;
    background-color: ${White};
    overflow-y: scroll;
    overflow-x: visible;
    & > button {
        margin-left: 60px;
        width: fit-content;
        text-align: center;
        padding: 10px;
        background: black;
        color: ${White};
        border-radius: 10px;
        cursor: pointer;
    }
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
    flex-direction: column;
    gap: 10px;
    margin: 10px;
    & > p {
        font-weight: bold;
    }
    & > div {
        display: flex;
        flex-direction: row;
        gap: 10px;
    }
    & > div > div > ul {
        width: 100%;
        list-style: none;
    }
`;
const SortSelectBox = styled.div`
    display: flex;
    gap: 10px;
    flex-direction: column;
    & > button {
        cursor: pointer;
        display: flex;
        gap: 10px;
        height: 35px;
        background-color: ${White};
        justify-content: center;
        align-items: center;
        padding: 10px;
        border: 1px solid ${Grey};
        border-radius: 10px;
        &:hover {
            color: ${Orange};
        }
    }
    & > ul {
        width: 100px;
        border: 1px solid ${Grey};
        border-radius: 10px;
        font-size: 13px;
        text-align: center;
        & > li {
            margin-top: 6px;
            margin-bottom: 6px;
            cursor: pointer;
            &:hover {
                background: ${LightGrey};
            }
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
