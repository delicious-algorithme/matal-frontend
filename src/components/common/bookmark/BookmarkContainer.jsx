import { ReactComponent as BookmarkIcon } from '../../../assets/Icon/detail/Bookmark.svg';
import { deleteBookmarkStore, postBookmarkStore } from '../../../apis/api/bookmarks';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSaveBookmarkId } from '../../../store';
import { Bookmark } from '@mui/icons-material';

const BookmarkContainer = ({ storeId }) => {
    const { savedStoreId } = useSaveBookmarkId();

    const isSaved = savedStoreId.includes(storeId);

    const navigate = useNavigate();

    const handleClickBookmarks = async (e) => {
        const auth = JSON.parse(localStorage.getItem('auth')) || {};
        e.preventDefault();
        if (!auth.state.isLoggedIn) {
            navigate('/login');
        }

        try {
            if (isSaved) {
                const response = await deleteBookmarkStore(storeId);
                if (response.status === 200) {
                    console.log('success delete');
                }
            } else {
                const response = await postBookmarkStore(storeId);
                if (response.status === 200) {
                    navigate('/bookmark');
                } else {
                    console.log(response.error);
                }
            }
        } catch (error) {
            console.log('bookmark:', error);
        }
    };

    return (
        <BookmarkBox onClick={handleClickBookmarks}>
            {!isSaved && <BookmarkIcon />}
            {isSaved && <Bookmark />}
        </BookmarkBox>
    );
};

export default BookmarkContainer;

const BookmarkBox = styled.div`
    display: flex;
    justify-content: end;
    padding: 10px;
`;
