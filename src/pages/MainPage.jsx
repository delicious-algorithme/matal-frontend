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
                <BannerBox>
                    <img
                        src="https://wnstn6945.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F499f229c-bff2-4c82-ae94-81c36fa59a9c%2Ffc4bf7f0-53f2-4e38-843f-008cb56d4cf3%2F%25E1%2584%2586%25E1%2585%25A6%25E1%2584%258B%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2587%25E1%2585%25A2%25E1%2584%2582%25E1%2585%25A5_(3).svg?table=block&id=9c8fac30-087f-4a3e-b56a-0f35e767980a&spaceId=499f229c-bff2-4c82-ae94-81c36fa59a9c&userId=&cache=v2"
                        alt="banner"
                        width="100%"
                        height="100%"
                    />
                </BannerBox>
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

const BannerBox = styled.div`
    width: 80%;
    height: 100%;
    margin-top: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 768px) {
        display: none;
    }
`;
