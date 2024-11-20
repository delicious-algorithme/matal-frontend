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
import { useInfiniteQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';

const StoreList = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [input, setInput] = useState(location.state?.searchInput);
    const [orderByRating, setOrderByRating] = useState(null);
    const [orderByPositiveRatio, setorderByPositiveRatio] = useState(null);

    const { setStoreList } = useStoreList();
    const { isFetchAll, setIsFetchAll } = useIsFetch();
    const { filterParams, setFilterParams } = useFilterParams();
    const { tagList, setTagList } = useTagList();
    const { ref, inView } = useInView();

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

    const fetchStoreData = async ({ pageParam }) => {
        const response = await getStoreList({ ...Params, page: pageParam });
        return response.data;
    };

    const fetchStoreAll = async ({ pageParam }) => {
        const response = await getStoreAll({
            page: pageParam,
            orderByPositiveRatio,
            orderByRating,
        });
        return response.data;
    };

    const { data, fetchNextPage, isLoading } = useInfiniteQuery(
        ['stores', Params, isFetchAll, filterParams, tagList],
        async ({ pageParam = 0 }) => {
            if (isFetchAll) {
                return await fetchStoreAll({ pageParam });
            }
            return await fetchStoreData({ pageParam });
        },
        {
            getNextPageParam: (lastPage) => {
                return lastPage.last ? undefined : lastPage.pageable.pageNumber + 1;
            },
            refetchOnWindowFocus: false,
            cacheTime: 1000 * 60 * 5,
        }
    );

    const stores = data?.pages.flatMap((page) => page.content) || [];
    const isNothing = !stores.length && !isLoading;

    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }, [inView, fetchNextPage]);

    useEffect(() => {
        if (stores.length > 0) {
            setStoreList(stores);
        }
    }, [data]);

    useEffect(() => {
        if (
            filterParams.searchKeywords !== input ||
            filterParams.orderByRating !== orderByRating ||
            filterParams.orderByPositiveRatio !== orderByPositiveRatio
        ) {
            setFilterParams({
                ...filterParams,
                searchKeywords: input || null,
                orderByRating,
                orderByPositiveRatio,
            });
        }
    }, [input, orderByRating, orderByPositiveRatio]);

    useEffect(() => {
        if (location.state?.searchInput) {
            setIsFetchAll(false);
        }
        if (tagList.length > 0 || (input && input.length > 0)) {
            setIsFetchAll(false);
        } else {
            if (!tagList || tagList.length === 0) {
                setIsFetchAll(true);
            }
        }
    }, [isFetchAll, filterParams, orderByPositiveRatio, orderByRating]);

    //main에서 받아오는 카테고리
    const category = location.state?.category ? location.state?.category : null;

    const allFetchButtonHandler = () => {
        setFilterParams(initialParams);
        window.localStorage.removeItem('filter-params');
        setTagList([]);
        setOrderByRating(null);
        setorderByPositiveRatio(null);
        setInput(null);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            Params.searchKeywords = input;
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

    if (isLoading) return <div>Loading...</div>;
    return (
        <StoreListLayout>
            <FilteringContentsContainer>
                <ButtonContainer>
                    <Button visible="true" color="green" onClickHandler={() => navigate('/')} text="뒤로 가기" />
                    <Button visible="true" color="green" onClickHandler={allFetchButtonHandler} text="전체 식당 보기" />
                </ButtonContainer>
                <SearchBarContainer>
                    <SearchBar
                        onChangeHandler={(e) => setInput(e.target.value)}
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
                    stores.map((store, index) => (
                        <StoreListCard
                            key={`${store.storeId}-${index}`}
                            id={store.storeId}
                            image={store.imageUrls}
                            name={store.name}
                            address={store.address}
                            rating={store.rating}
                            positiveKeywords={store.positiveKeywords}
                            storeLink={store.storeLink}
                            positiveRatio={store.positiveRatio}
                        />
                    ))}
                {isNothing && stores.length === 0 && <Alert>조건에 맞는 검색어가 없습니다. </Alert>}
            </StoreListCardContainer>
            <Ref ref={ref} />
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

    @media screen and (max-width: 350px) {
        width: 80%;
    }
`;

const FilteringContentsContainer = styled.div`
    background-color: ${White};
    z-index: 10;
    padding: 10px;
    margin-bottom: 20px;

    @media screen and (max-width: 350px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

const StoreListCardContainer = styled.div``;

const Ref = styled.div`
    width: 100%;
    height: 50px;
`;

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
