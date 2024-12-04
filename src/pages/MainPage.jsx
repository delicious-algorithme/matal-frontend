import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsFetch, useSaveBookmarkId } from '../store';
import { CategoryAndMap, SearchKeyword, TopRecommendations } from '../components/main';
import { SearchBar, Button, Footer } from '../components/common';
import { getAllBookmarksIds } from '../apis/api/bookmarks';

const MainPage = () => {
    const [searchInput, setSearchInput] = useState();
    const navigate = useNavigate();
    const { setIsFetchAll } = useIsFetch();
    const { setSaveBookmarkId } = useSaveBookmarkId();

    const onChangeHandler = (e) => {
        setSearchInput(e.target.value);
    };

    const onKeyDownHandler = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setIsFetchAll(false);
            if (e.target.value) {
                navigate(`/webmap/storeList/${searchInput}`, {
                    state: {
                        searchInput: `${searchInput}`,
                    },
                });
            }
        }
    };

    useEffect(() => {
        const auth = JSON.parse(localStorage.getItem('auth')) || {};
        if (auth.state.isLoggedIn) {
            getAllBookmarksStores();
        }
        // eslint-disable-next-line
    }, []);

    const buttonClickHandler = () => {
        navigate('/webmap');
    };

    const getAllBookmarksStores = async () => {
        try {
            const response = await getAllBookmarksIds();
            if (response.status === 200) {
                const bookmarkIds = response.data;
                setSaveBookmarkId(bookmarkIds);
            } else if (response.status === 401) {
                navigate('/login');
            } else if (response.status === 404) {
                navigate('/*');
            } else {
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        } finally {
            console.log('success getBookmark');
        }
    };

    return (
        <>
            <MainPageLayout>
                <img
                    src="https://wnstn6945.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F499f229c-bff2-4c82-ae94-81c36fa59a9c%2Fc5ffdb70-a5f8-45cb-95f5-84905578edc1%2FMainImage.svg?table=block&id=1528cdfc-6811-8057-976f-c3838870753e&spaceId=499f229c-bff2-4c82-ae94-81c36fa59a9c&userId=&cache=v2"
                    width="100%"
                    height="100%"
                    alt="banner"
                />
                <SearchBarContainer>
                    <SearchBar
                        searchInput={searchInput}
                        onChangeHandler={onChangeHandler}
                        onKeyDownHandler={onKeyDownHandler}
                    />
                </SearchBarContainer>
                <SearchKeyword />
                <Button color="green" text="식당 찾아 보기" visible="true" onClickHandler={buttonClickHandler} />
                <TopRecommendations />
                <CategoryAndMap />
            </MainPageLayout>
            <Footer />
        </>
    );
};

export default MainPage;

const MainPageLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;

    & > img {
        width: 80%;
        filter: brightness(0.8);
        border-radius: 20px;
    }

    @media screen and (max-width: 500px) {
        gap: 10px;
        & > img {
            width: 100%;
            border-radius: 0px;
        }
    }
`;

const SearchBarContainer = styled.div`
    width: 60%;

    @media screen and (max-width: 1024px) {
        width: 80%;
    }

    @media screen and (max-width: 500px) {
        display: none;
    }
`;
