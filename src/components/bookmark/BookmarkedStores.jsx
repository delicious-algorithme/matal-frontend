import styled from 'styled-components';
import { getBookmarksStores } from '../../apis/api/bookmarks';
import { StoreCard } from '../storeCard';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grey } from '../../color';
import { useSaveBookmarkId } from '../../store';
import { useInfiniteQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';
import { Loading } from '../common';

const BookmarkedStores = () => {
    const [stores, setStores] = useState([]);
    const [isTimeout, setIsTimeout] = useState(false);
    const { setBookmarkStore } = useSaveBookmarkId();

    const navigate = useNavigate();
    const { ref, inView } = useInView();

    const fetchBookmarkStores = async ({ pageParam = 0 }) => {
        const auth = JSON.parse(localStorage.getItem('auth')) || {};
        if (!auth.state.isLoggedIn) {
            navigate('/login');
        }
        try {
            const response = await getBookmarksStores(pageParam);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    };

    const { data, fetchNextPage, isLoading } = useInfiniteQuery(
        ['bookmark'],
        async ({ pageParam }) => {
            return await fetchBookmarkStores({ pageParam });
        },
        {
            getNextPageParam: (lastPage) => {
                return lastPage.last ? undefined : lastPage.pageable.pageNumber + 1;
            },
            refetchOnWindowFocus: false,
            cacheTime: 1000 * 60 * 5,
        }
    );

    const bookmarkStores = data?.pages.flatMap((page) => page.content) || [];
    const isNothing = !stores.length && !isLoading;

    useEffect(() => {
        if (inView) fetchNextPage();
    }, [inView, fetchNextPage]);

    useEffect(() => {
        if (bookmarkStores.length > 0) {
            setBookmarkStore(bookmarkStores);
            setStores(bookmarkStores);
        }
        // eslint-disable-next-line
    }, [data]);

    useEffect(() => {
        if (isLoading) {
            const timeout = setTimeout(() => {
                setIsTimeout(true);
                navigate('/*');
            }, 5000);
            return () => clearTimeout(timeout);
        }
    }, [isLoading, navigate]);

    if (isTimeout) {
        return null;
    }

    const handleClickScrap = () => navigate('/webmap');

    return (
        <>
            <BookmarkLayout isNothing={isNothing}>
                {!isLoading &&
                    bookmarkStores.length > 0 &&
                    bookmarkStores.map((store) => (
                        <StoreCard
                            address={store.storeResponseDto.address}
                            key={store.storeResponseDto.storeId}
                            storeId={store.storeResponseDto.storeId}
                            image={store.storeResponseDto.imageUrls}
                            positiveRatio={store.storeResponseDto.positiveRatio}
                            keyword={store.storeResponseDto.positiveKeywords}
                            name={store.storeResponseDto.name}
                        />
                    ))}
                <Ref ref={ref} />
                {isLoading && <Loading />}
            </BookmarkLayout>
            {isNothing && (
                <EmptyBox isNothing={isNothing}>
                    <h2> 저장된 가게가 없습니다.</h2>
                    <button onClick={handleClickScrap}>스크랩 하러 가기</button>
                </EmptyBox>
            )}
        </>
    );
};

export default BookmarkedStores;

const BookmarkLayout = styled.div`
    width: 100%;
    height: 100%;
    display: ${(props) => (props.isNothing ? 'none' : 'grid')};
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
    align-items: center;
    gap: 20px;
    margin: 0 auto;

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 500px) {
        grid-template-columns: repeat(1, 1fr);
    }
`;

const EmptyBox = styled.div`
    width: 100%;
    height: 400px;
    display: ${(props) => (props.isNothing ? 'flex' : 'none')};

    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;

    & > button {
        width: 120px;
        border-radius: 10px;
        padding: 10px;
        cursor: pointer;
        font-weight: 600;

        &:hover {
            background-color: ${Grey};
        }
    }
`;

const Ref = styled.div`
    width: 100%;
    height: 100px;
`;
