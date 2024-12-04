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
                {!isSaved && (
                    <img
                        src="https://wnstn6945.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F499f229c-bff2-4c82-ae94-81c36fa59a9c%2F36a09915-8f56-4547-843b-ef56ecef4922%2FVector_(20).svg?table=block&id=2c906fd9-ead9-41c7-bcf5-1a5f05e052de&spaceId=499f229c-bff2-4c82-ae94-81c36fa59a9c&userId=&cache=v2"
                        alt="bookmark"
                    />
                )}
                {isSaved && (
                    <img
                        src="https://wnstn6945.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F499f229c-bff2-4c82-ae94-81c36fa59a9c%2F5a28ad27-0c60-43da-b35c-e4515852dac2%2FVector_(21).svg?table=block&id=44a15545-ec6b-4c1d-9573-9cbe209f0c40&spaceId=499f229c-bff2-4c82-ae94-81c36fa59a9c&userId=&cache=v2"
                        alt="saved-bookmark"
                    />
                )}
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
