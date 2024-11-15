import styled from 'styled-components';
import { DarkGrey, Grey, Orange, White } from '../../../color';
import StoreListCard from './StoreCard';
import { useEffect, useState } from 'react';
import { getStoreList } from '../../../apis/api/getStoreList';
import { getStoreAll } from '../../../apis/api/getStoreAll';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../button/Button';
import { useStoreList, useIsFetch, useFilterParams, useTagList } from '../../../store';
import Filtering from '../filtering/Filtering';
import SearchBar from '../searchBar/SearchBar';

const StoreList = () => {
    const location = useLocation();
    const navigate = useNavigate();

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

    const onClicktoBackButton = () => {
        navigate('/');
    };

    return (
        <StoreListLayout>
            <FilteringContentsContainer>
                <ButtonContainer>
                    <Button visible="true" color="green" onClickHandler={onClicktoBackButton} text="뒤로 가기" />
                    <Button visible="true" color="green" onClickHandler={allFetchButtonHandler} text="전체 식당 보기" />
                </ButtonContainer>
                <SearchBarContainer>
                    <SearchBar
                        onChangeHandler={handleInputChange}
                        onKeyDownHandler={handleKeyDown}
                        searchInput={input}
                    />
                </SearchBarContainer>
                <Filtering category={category} />
                <SortBox>
                    <p>정렬</p>
                    <div>
                        <SortSelectBox active={orderByRating === 'desc'}>
                            <Button
                                visible="true"
                                color="white"
                                onClickHandler={() => sortReviewClickHandler('desc')}
                                text="평점 높은 순"
                            />
                        </SortSelectBox>
                        <SortSelectBox active={orderByPositiveRatio === 'desc'}>
                            <Button
                                visible="true"
                                color="white"
                                onClickHandler={() => sortPositiveClickHandler('desc')}
                                text="긍정 비율 높은 순"
                            />
                        </SortSelectBox>
                    </div>
                </SortBox>
            </FilteringContentsContainer>
            <StoreListCardContainer>
                {stores &&
                    stores.map((store) => {
                        return (
                            <StoreListCard
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
            </StoreListCardContainer>
        </StoreListLayout>
    );
};

export default StoreList;

const StoreListLayout = styled.div`
    margin-top: 10px;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    background-color: ${White};

    @media screen and (max-width: 1024px) {
        min-width: 200px;
    }
`;

const FilteringContentsContainer = styled.div`
    background-color: ${White};
    z-index: 10;
    padding: 10px;
    margin-bottom: 20px;
`;

const StoreListCardContainer = styled.div``;

const ButtonContainer = styled.div`
    display: flex;
    gap: 10px;
    margin: 10px;
`;

const SearchBarContainer = styled.div`
    margin: 10px;

    & > input {
        width: 100%;
    }
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
`;

const SortSelectBox = styled.div`
    display: flex;
    gap: 10px;
    flex-direction: column;
    & > button {
        cursor: pointer;
        display: flex;
        color: ${DarkGrey};
        align-items: center;
        border: 1px solid ${Grey};
        ${(props) =>
            props.active &&
            `
            color: ${Orange}; 
            border-color: ${Orange};
        `}
    }
`;

const Alert = styled.h3`
    padding: 14px;
    display: flex;
    font-weight: 400;
    font-size: 15px;
    color: ${Orange};
`;
