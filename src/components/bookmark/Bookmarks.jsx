import styled from 'styled-components';
import { getBookmarksStores } from '../../apis/api/bookmarks';
import { TopStoreCard } from '../storeCard';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grey } from '../../color';
import { useSaveBookmarkId } from '../../store';

const Bookmarks = () => {
    const [stores, setStores] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { setSaveBookmarkId, setBookmarkStore } = useSaveBookmarkId();

    const navigate = useNavigate();

    useEffect(() => {
        fetchBookmarkStores();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (stores.length > 0) {
            console.log('stores', stores);
            const saveBookmarkId = stores.map((store) => store.bookmarkId);
            console.log(saveBookmarkId);
            const bookmarkIds = [...new Set(saveBookmarkId)];
            setSaveBookmarkId(bookmarkIds);
        }
        // eslint-disable-next-line
    }, [stores]);

    const fetchBookmarkStores = async () => {
        const auth = JSON.parse(localStorage.getItem('auth')) || {};
        if (!auth.state.isLoggedIn) {
            navigate('/login');
        }

        setIsLoading(true);
        try {
            const response = await getBookmarksStores(0);
            if (response.status === 200) {
                const newData = response.data;
                setStores([...newData]);
                setBookmarkStore([...newData]);
            } else {
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClickScrap = () => {
        navigate('/webmap');
    };

    return (
        <>
            {stores.length !== 0 && (
                <BookmarkLayout>
                    {!isLoading &&
                        stores.length > 0 &&
                        stores.map((store) => (
                            <TopStoreCard
                                bookmarkId={store.bookmarkId}
                                address={store.storeResponseDto.address}
                                key={store.storeResponseDto.storeId}
                                image={store.storeResponseDto.imageUrls}
                                id={store.storeResponseDto.storeId}
                                positiveRatio={store.storeResponseDto.positiveRatio}
                                keyword={store.storeResponseDto.positiveKeywords}
                                name={store.storeResponseDto.name}
                            />
                        ))}
                </BookmarkLayout>
            )}
            {stores.length === 0 && (
                <EmptyBox>
                    <h2> 저장된 가게가 없습니다.</h2>
                    <button onClick={handleClickScrap}>스크랩 하러 가기</button>
                </EmptyBox>
            )}
        </>
    );
};

export default Bookmarks;

const BookmarkLayout = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
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
    display: flex;
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
