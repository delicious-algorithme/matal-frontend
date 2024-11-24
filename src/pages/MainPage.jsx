import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Banner } from '../assets/Icon/banner/Banner.svg';
import { useIsFetch, useSaveBookmarkId } from '../store';
import { CategoryContainer, SearchKeyword, TopRecommendations, MapContainer } from '../components/main';
import { SearchBar, Button, Footer } from '../components/common';
import { getBookmarksStores } from '../apis/api/bookmarks';

const MainPage = () => {
    const [searchInput, setSearchInput] = useState();
    const navigate = useNavigate();
    const [stores, setStores] = useState();
    const { setIsFetchAll } = useIsFetch();
    const { setBookmarkStore, setSaveBookmarkId } = useSaveBookmarkId();

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

    useEffect(() => {
        if (stores.length > 0) {
            const saveBookmarkId = stores.map((store) => store.bookmarkId);
            const bookmarkIds = [...new Set(saveBookmarkId)];
            setSaveBookmarkId(bookmarkIds);
        }
        // eslint-disable-next-line
    }, [stores]);

    const buttonClickHandler = () => {
        navigate('/webmap');
    };

    const getAllBookmarksStores = async () => {
        try {
            let page = 0;
            let allData = [];
            let hasMoreData = true;
            while (hasMoreData) {
                const response = await getBookmarksStores(page);
                if (response.status === 200) {
                    allData = allData.concat(response.data.content);
                    hasMoreData = response.data.last !== true;
                    page++;
                } else {
                    navigate('/login');
                }
            }
            setBookmarkStore(allData);
            setStores(allData);
        } catch (error) {
            console.log(error);
        } finally {
            console.log('success getBookmark');
        }
    };

    return (
        <>
            <MainPageLayout>
                <Banner width="80%" height="100%" />
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
                <CategoryContainer />
                <MapContainer />
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
        & > svg {
            display: none;
        }
    }
`;

const SearchBarContainer = styled.div`
    width: 60%;

    @media screen and (max-width: 1024px) {
        width: 80%;
    }
`;
