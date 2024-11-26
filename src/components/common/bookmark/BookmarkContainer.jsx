import { ReactComponent as BookmarkIcon } from '../../../assets/Icon/detail/Bookmark.svg';
import { ReactComponent as SavedBookmarkIcon } from '../../../assets/Icon/detail/SavedBookmark.svg';
import { deleteBookmarkStore, postBookmarkStore } from '../../../apis/api/bookmarks';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getAllBookmarksIds } from '../../../apis/api/bookmarks';
import { useSaveBookmarkId } from '../../../store';
import { useState } from 'react';

const BookmarkContainer = ({ storeId }) => {
    const { savedId, setSaveBookmarkId } = useSaveBookmarkId();
    const [isLoading, setIsLoading] = useState(false);
    const auth = JSON.parse(localStorage.getItem('auth')) || {};
    const isSaved = savedId.some((item) => item.storeId === storeId && auth.state.isLoggedIn);

    const navigate = useNavigate();

    const handleClickBookmarks = async (e) => {
        e.preventDefault();
        if (!auth.state.isLoggedIn) {
            navigate('/login');
        }
        try {
            if (isSaved) {
                const bookmarkIdIndex = savedId.find((item) => item.storeId === storeId);
                const response = await deleteBookmarkStore(bookmarkIdIndex.bookmarkId);
                if (response.status === 204) {
                    console.log('success delete');
                    getAllBookmarksStores();
                }
            } else {
                const response = await postBookmarkStore(storeId);
                if (response.status === 201) {
                    getAllBookmarksStores();
                } else {
                    console.log(response.error);
                }
            }
        } catch (error) {
            console.log('bookmark:', error);
        }
    };

    const getAllBookmarksStores = async () => {
        const auth = JSON.parse(localStorage.getItem('auth')) || {};
        if (!auth.state.isLoggedIn) {
            navigate('/login');
        }
        try {
            setIsLoading(true);
            const response = await getAllBookmarksIds();
            if (response.status === 200) {
                const bookmarkStoreIds = response.data;
                setSaveBookmarkId(bookmarkStoreIds);
            } else {
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
            console.log('success getBookmark');
        }
    };

    return (
        !isLoading && (
            <BookmarkBox onClick={handleClickBookmarks}>
                {!isSaved && <BookmarkIcon />}
                {isSaved && <SavedBookmarkIcon />}
            </BookmarkBox>
        )
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
