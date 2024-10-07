import styled from 'styled-components';
import { DarkGrey, Grey, LightGrey, Orange, White } from '../../../color';
import { ReactComponent as SearchIcon } from './../../../assets/Icon/detail/Feather Icon.svg';
import StoreCard from './StoreCard';
import { useEffect, useState } from 'react';
import { getStoreList } from '../../../apis/api/getStoreList';
import { getStoreAll } from '../../../apis/api/getStoreAll';
import { useLocation } from 'react-router-dom';
import { useStoreList, useIsFetch, useFilterParams, useTagList } from '../../../store';
import Filtering from '../filtering/Filtering';
const StoreList = () => {
    const location = useLocation();

    const [stores, setStores] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [isNothing, setIsNothing] = useState(false);

    const [input, setInput] = useState(location.state?.searchInput);
    const [orderByRating, setOrderByRating] = useState(null);
    const [orderByPositiveRatio, setorderByPositiveRatio] = useState(null);

    const { setStoreList } = useStoreList();
    const { isFetchAll, setIsFetchAll } = useIsFetch();
    const { filterParams, setFilterParams } = useFilterParams();
    const { tagList, setTagList } = useTagList();

    const Params = {
        ...filterParams,
        searchKeywords: input ? input : null,
        orderByRating,
        orderByPositiveRatio,
    };
    const initialParams = {
        addresses: [],
        category: [],
        positiveKeyword: [],
    };

    const fetchStoreData = async (page) => {
        setIsLoading(true);
        setHasMore(true);
        if (isFetchAll) {
            return;
        }
        if (JSON.stringify(filterParams) === JSON.stringify(initialParams) && !input) {
            return;
        }
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
        if (!isFetchAll) return;
        if (page > 100) return;
        try {
            const response = await getStoreAll({
                page: page,
                orderByPositiveRatio: orderByPositiveRatio,
                orderByRating: orderByRating,
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

    //main에서 받아오는 카테고리
    const isExistCategory = () => {
        if (location.state?.category) {
            return location.state?.category;
        }
        return null;
    };

    const category = isExistCategory();

    const initStores = () => {
        setStores([]);
        setPage(0);
    };

    const fetchAllStores = () => {
        initStores();
        fetchStoreAll(0);
        setIsFetchAll(true);
    };

    const fetchStores = () => {
        initStores();
        fetchStoreData(0);
        setIsFetchAll(false);
    };

    const allFetchButtonHandler = () => {
        setFilterParams(initialParams);
        window.localStorage.removeItem('filter-params');
        setTagList([]);
        setOrderByRating(null);
        setorderByPositiveRatio(null);
        setInput(null);
        setTimeout(() => {
            fetchAllStores();
        }, 0);
    };

    useEffect(() => {
        if (location.state?.searchInput) {
            fetchStores();
        }
        if (tagList.length > 0 || (input && input.length > 0)) {
            fetchStores();
        } else {
            if (!tagList || tagList.length === 0) {
                fetchAllStores();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFetchAll, filterParams, orderByPositiveRatio, orderByRating]);

    useEffect(() => {
        const updateStores = stores;
        setStoreList(updateStores);
    }, [stores, setStoreList]);

    useEffect(() => {
        if (hasMore) {
            if (!isFetchAll) {
                fetchStoreData(page);
            } else {
                fetchStoreAll(page);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            Params.searchKeywords = input;
            initStores();
            fetchStores();
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
            <button onClick={allFetchButtonHandler}>전체 식당 보기</button>
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
            <Filtering category={category} />
            <SortBox>
                <p>정렬</p>
                <div>
                    <SortSelectBox active={orderByRating === 'desc'}>
                        <button onClick={() => sortReviewClickHandler('desc')}>평점 높은 순</button>
                    </SortSelectBox>
                    <SortSelectBox active={orderByPositiveRatio === 'desc'}>
                        <button onClick={() => sortPositiveClickHandler('desc')}>긍정 비율 높은 순</button>
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
        width: fit-content;
        text-align: center;
        padding: 10px;
        color: ${Orange};
        background: ${LightGrey};
        font-weight: bold;
        border-radius: 10px;
        cursor: pointer;
        &:hover {
            background: ${Orange};
            color: ${White};
        }
    }
    @media screen and (max-width: 1024px) {
        min-width: 200px;
        height: auto;
        margin-left: 20px;
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
        font-size: 10px;
        input::placeholder {
            color: ${Orange};
            font-size: 12px;
        }
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
        color: ${DarkGrey};
        font-weight: bold;
        justify-content: center;
        align-items: center;
        padding: 10px;
        border: 1px solid ${Grey};
        border-radius: 10px;
        &:hover {
            color: ${Orange};
        }
        ${(props) =>
            props.active &&
            `
            color: ${Orange}; 
            border-color: ${Orange};
        `}
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
