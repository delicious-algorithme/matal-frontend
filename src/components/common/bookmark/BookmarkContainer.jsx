import { ReactComponent as BookmarkIcon } from '../../../assets/Icon/detail/Bookmark.svg';
import { ReactComponent as SavedBookmarkIcon } from '../../../assets/Icon/detail/SavedBookmark.svg';
import { deleteBookmarkStore, postBookmarkStore } from '../../../apis/api/bookmarks';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getBookmarksStores } from '../../../apis/api/bookmarks';
import { useSaveBookmarkId } from '../../../store';

const BookmarkContainer = ({ bookmarkId, storeId }) => {
    const { savedId, setBookmarkStore } = useSaveBookmarkId();

    const auth = JSON.parse(localStorage.getItem('auth')) || {};
    const isSaved = savedId.includes(bookmarkId) && auth.state.isLoggedIn;
    const navigate = useNavigate();

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
                    navigate(0);
                }
            } else {
                const response = await postBookmarkStore(storeId);
                if (response.status === 201) {
                    fetchBookmarkStores();
                    navigate(0);
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
                setBookmarkStore([...newData]);
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
`;
