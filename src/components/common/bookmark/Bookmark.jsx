import { ReactComponent as BookmarkIcon } from '../../../assets/Icon/detail/Bookmark.svg';
import { postBookmarkStore } from '../../../apis/api/bookmarks';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Bookmark = (storeId) => {
    const navigate = useNavigate();

    const handleClickBookmarks = async (e) => {
        const auth = JSON.parse(localStorage.getItem('auth')) || {};

        if (!auth.state.isLoggedIn) {
            navigate('/login');
        }

        const bookmarkForm = {
            storeId,
        };

        e.preventDefault();
        const response = await postBookmarkStore(bookmarkForm);
        if (response.status === 200) {
            navigate('/bookmark');
        } else {
            console.log(response.error);
        }
    };

    return (
        <BookmarkBox onClick={handleClickBookmarks}>
            <BookmarkIcon />
        </BookmarkBox>
    );
};

export default Bookmark;

const BookmarkBox = styled.div`
    display: flex;
    justify-content: end;
    padding: 10px;
`;
