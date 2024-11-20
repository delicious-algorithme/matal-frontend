import { ReactComponent as BookmarkIcon } from '../../../assets/Icon/detail/Bookmark.svg';
import { ReactComponent as SavedBookmarkIcon } from '../../../assets/Icon/detail/SavedBookmark.svg';
import { deleteBookmarkStore, postBookmarkStore } from '../../../apis/api/bookmarks';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getBookmarksStores } from '../../../apis/api/bookmarks';
import { useSaveBookmarkId } from '../../../store';
import { useState, useEffect } from 'react';

const BookmarkContainer = ({ bookmarkId, storeId }) => {
    const [stores, setStores] = useState([]);
    const { savedId, setSaveBookmarkId, setBookmarkStore } = useSaveBookmarkId();

    const auth = JSON.parse(localStorage.getItem('auth')) || {};
    const isSaved = savedId.includes(bookmarkId) && auth.state.isLoggedIn;

    const navigate = useNavigate();

    useEffect(() => {
        console.log('bookmarkId: ', bookmarkId, storeId);
        if (stores.length > 0) {
            const saveBookmarkId = stores.map((store) => store.bookmarkId);
            const bookmarkIds = [...new Set(saveBookmarkId)];
            setSaveBookmarkId(bookmarkIds);
        }
        // eslint-disable-next-line
    }, [stores]);

    const handleClickBookmarks = async (e) => {
        e.preventDefault();
        if (!auth.state.isLoggedIn) {
            navigate('/login');
        }
        try {
            if (isSaved) {
                const response = await deleteBookmarkStore(bookmarkId);
                if (response.status === 204) {
                    console.log('success delete');
                    fetchBookmarkStores();
                }
            } else {
                const response = await postBookmarkStore(storeId);
                if (response.status === 201) {
                    fetchBookmarkStores();
                } else {
                    console.log(response.error);
                }
            }
        } catch (error) {
            console.log('bookmark:', error);
        }
    };

    const fetchBookmarkStores = async () => {
        const auth = JSON.parse(localStorage.getItem('auth')) || {};
        if (!auth.state.isLoggedIn) {
            navigate('/login');
        }
        try {
            const response = await getBookmarksStores();
            if (response.status === 200) {
                const newData = response.data;
                setStores([...newData]);
                setBookmarkStore([...newData]);
                navigate(0);
            } else {
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
        } finally {
            console.log('success getBookmark');
        }
    };

    return (
        <BookmarkBox onClick={handleClickBookmarks}>
            {!isSaved && <BookmarkIcon />}
            {isSaved && <SavedBookmarkIcon />}
        </BookmarkBox>
    );
};

export default BookmarkContainer;

const BookmarkBox = styled.div`
    display: flex;
    justify-content: end;
    padding: 10px;

    & > svg {
        cursor: pointer;
    }
`;
