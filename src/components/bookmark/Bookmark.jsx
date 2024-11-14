import styled from 'styled-components';
import { getBookmarksStores } from '../../apis/api/bookmarks';
import { TopStoreCard } from '../storeCard';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockData } from '../../constants/mockData';

const Bookmarks = () => {
    const [stores, setStores] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setStores(mockData);
        fetchBookmarkStores();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchBookmarkStores = async () => {
        const auth = JSON.parse(localStorage.getItem('auth')) || {};
        if (!auth.state.isLoggedIn) {
            navigate('/login');
        }

        setStores(mockData);
        setIsLoading(true);
        try {
            const response = await getBookmarksStores();
            if (response.status === 200) {
                const newData = response.data.content;
                setStores(newData);
            }
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <BookmarkLayout>
            {!isLoading &&
                stores.length > 0 &&
                stores.map((store) => (
                    <TopStoreCard
                        address={store.address}
                        key={store.storeId}
                        image={store.imageUrls}
                        id={store.storeId}
                        positiveRatio={store.positiveRatio}
                        keyword={store.positiveKeywords}
                        name={store.name}
                    />
                ))}
            {stores.length === 0 && <p>저장한 가게가 없습니다.</p>}
        </BookmarkLayout>
    );
};

export default Bookmarks;

const BookmarkLayout = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
    align-items: center;
    gap: 20px;
    margin: 0 auto;

    @media (max-width: 1060px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 500px) {
        grid-template-columns: repeat(1, 1fr);
    }
`;
