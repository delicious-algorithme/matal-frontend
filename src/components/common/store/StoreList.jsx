import styled from 'styled-components';
import { DarkGrey, Grey, Orange, White, LightGrey } from '../../../color';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { getStoreList } from '../../../apis/api/getStoreList';
import { getStoreAll } from '../../../apis/api/getStoreAll';

import StoreListCard from './StoreCard';
import Button from '../button/Button';
import Filtering from '../filtering/Filtering';
import SearchBar from '../searchBar/SearchBar';

import { useStoreList, useIsFetch, useFilterParams, useTagList, useSearchInput } from '../../../store';
import { useInfiniteQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';
import Loading from '../loading/Loading';

const StoreList = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { setSearchInput, searchInput } = useSearchInput();

    let initInput = '';

    if (location.state?.searchInput) {
        initInput = location.state?.searchInput;
    } else if (searchInput) {
        initInput = searchInput;
    }

    const [input, setInput] = useState(initInput);
    const [sortTarget, setSortTarget] = useState('rating');

    const { setStoreList } = useStoreList();
    const { isFetchAll, setIsFetchAll } = useIsFetch();
    const { filterParams, setFilterParams } = useFilterParams();
    const { tagList, setTagList } = useTagList();
    const { ref, inView } = useInView();

    const initialParams = {
        addresses: [],
        category: [],
        positiveKeyword: [],
    };

    const fetchStoreData = async ({ pageParam }) => {
        const response = await getStoreList({ ...filterParams, page: pageParam, sortTarget });
        return response.data;
    };

    const fetchStoreAll = async ({ pageParam }) => {
        const response = await getStoreAll({
            page: pageParam,
            sortTarget,
        });
        return response.data;
    };

    const { data, fetchNextPage, isLoading } = useInfiniteQuery(
        ['stores', isFetchAll, filterParams, sortTarget],
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
        if (location.state?.searchInput) {
            setFilterParams({ ...filterParams, searchKeywords: location.state?.searchInput });
        }
        // eslint-disable-next-line
    }, [location.state?.searchInput, setFilterParams]);

    useEffect(() => {
        if (inView) fetchNextPage();
    }, [inView, fetchNextPage]);

    useEffect(() => {
        if (stores.length > 0) setStoreList(stores);
        // eslint-disable-next-line
    }, [data]);

    const category = location.state?.category ? location.state?.category : null;

    useEffect(() => {
        if ((input && input.length > 0) || (tagList && tagList.length > 0)) {
            setIsFetchAll(false);
        } else {
            setIsFetchAll(true);
        }
        // eslint-disable-next-line
    }, [isFetchAll, filterParams, sortTarget]);

    const allFetchButtonHandler = () => {
        setFilterParams(initialParams);
        window.localStorage.removeItem('filter-params');
        setTagList([]);
        setSortTarget(null);
        setSearchInput(null);
        setInput(null);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (!input) {
                setFilterParams({ ...filterParams, searchKeywords: null });
                setSearchInput(null);
            } else {
                setFilterParams({ ...filterParams, searchKeywords: input });
                setSearchInput(input);
            }
        }
    };

    if (isLoading)
        return (
            <LoadingContainer>
                <Loading />
            </LoadingContainer>
        );

    return (
        <StoreListLayout>
            <StoreListHeader>
                <ButtonContainer>
                    <BackButton>
                        <ArrowBackIosIcon onClick={() => navigate('/')} />
                    </BackButton>
                    <Button visible="true" color="green" onClickHandler={allFetchButtonHandler} text="전체 식당 보기" />
                </ButtonContainer>
                <SearchBarContainer>
                    <SearchBar
                        onChangeHandler={(e) => setInput(e.target.value)}
                        onKeyDownHandler={handleKeyDown}
                        searchInput={input}
                    />
                </SearchBarContainer>
            </StoreListHeader>
            <FilteringContentsContainer>
                <Filtering category={category} />
                <SortBox>
                    <p>정렬</p>
                    <div>
                        <SortSelectBox active={sortTarget === 'rating'}>
                            <Button
                                visible="true"
                                color="white"
                                onClickHandler={() => {
                                    setFilterParams({ ...filterParams, sortTarget: 'rating' });
                                    setSortTarget('rating');
                                }}
                                text="평점 높은 순"
                            />
                        </SortSelectBox>
                        <SortSelectBox active={sortTarget === 'positiveRatio'}>
                            <Button
                                visible="true"
                                color="white"
                                onClickHandler={() => {
                                    setFilterParams({ ...filterParams, sortTarget: 'positiveRatio' });
                                    setSortTarget('positiveRatio');
                                }}
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
                {isNothing && <Alert>조건에 맞는 검색어가 없습니다. </Alert>}
            </StoreListCardContainer>
            <Ref ref={ref} />
        </StoreListLayout>
    );
};

export default StoreList;

const StoreListLayout = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    background-color: ${White};
    position: relative;

    &::-webkit-scrollbar {
        width: 10px;
        height: auto;
    }

    &::-webkit-scrollbar-thumb {
        background: rgba(217, 217, 217, 1);
        border-radius: 15px;
        width: 10px;
    }

    @media screen and (max-width: 370px) {
        width: 80%;
    }
`;

const FilteringContentsContainer = styled.div`
    background-color: ${White};
    z-index: 10;
    padding: 10px;
    margin-bottom: 20px;

    @media screen and (max-width: 370px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

const StoreListCardContainer = styled.div`
    position: relative;
`;

const Ref = styled.div`
    width: 100%;
    height: 50px;
`;

const BackButton = styled.div`
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;

    & > svg {
        cursor: pointer;
        &:hover {
            width: 28px;
            height: 28px;
        }
    }
`;

const ButtonContainer = styled.div`
    gap: 10px;
    width: 100%;
    height: 60px;
    padding: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    z-index: 20;
    background-color: ${White};

    @media screen and (max-width: 500px) {
        height: 50px;
    }
`;

const SearchBarContainer = styled.div`
    margin: 10px;

    & > input {
        width: 100%;
    }

    @media screen and (max-width: 500px) {
        width: 80%;
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

const LoadingContainer = styled.div`
    @media screen and (max-width: 450px) {
        margin-right: 90px;
    }
`;

const StoreListHeader = styled.div`
    position: sticky;
    width: 100%;
    top: 0;
    display: flex;
    flex-direction: column;
    z-index: 20;
    background-color: ${White};
    border-bottom: 1px solid ${LightGrey};
`;
