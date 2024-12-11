import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsFetch, useSaveBookmarkId } from '../store';
import { CategoryAndMap, CostPerformanceContent, TopRecommendations, AbundantAmountContents } from '../components/main';
import { SearchBar, Button, Footer } from '../components/common';
import { getAllBookmarksIds } from '../apis/api/bookmarks';
import { Banner } from '../components/main';

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
                <Banner />
                <SearchBarContainer>
                    <SearchBar
                        searchInput={searchInput}
                        onChangeHandler={onChangeHandler}
                        onKeyDownHandler={onKeyDownHandler}
                    />
                </SearchBarContainer>
                <Button color="orange" text="맛집 찾아 보기" visible="true" onClickHandler={buttonClickHandler} />
                <SliderContents>
                    <TopRecommendations />
                </SliderContents>
                <CategoryAndMap />
            </MainPageLayout>
            <Footer />
        </>
    );
};

export default MainPage;

const MainPageLayout = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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

const SliderContents = styled.section`
    display: flex;
    width: 100%;
    flex-direction: column;
    max-width: 1120px;

    @media screen and (max-width: 1300px) {
        width: 80%;
        max-width: 980px;
    }
`;
