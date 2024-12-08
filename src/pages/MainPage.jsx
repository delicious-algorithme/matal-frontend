import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsFetch, useSaveBookmarkId } from '../store';
import { CategoryAndMap, SearchKeyword, TopRecommendations } from '../components/main';
import { SearchBar, Button, Footer } from '../components/common';
import banner from '../assets/banner.webp';
import { getAllBookmarksIds } from '../apis/api/bookmarks';
import { White } from '../color';
import { keyframes } from 'styled-components';

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
                <BannerWrap>
                    <BannerText>
                        <p>맛있는 알고리즘이</p>
                        <p> 분석한 리뷰로</p>
                        <p> 당신만의 맛집을 찾아보세요</p>
                    </BannerText>
                </BannerWrap>
                <SearchBarContainer>
                    <SearchBar
                        searchInput={searchInput}
                        onChangeHandler={onChangeHandler}
                        onKeyDownHandler={onKeyDownHandler}
                    />
                </SearchBarContainer>
                <SearchKeyword />
                <Button color="orange" text="식당 찾아 보기" visible="true" onClickHandler={buttonClickHandler} />
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
    width: 100%;
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

const moveInText = keyframes`
    0% {
        transform: translateY(100%);
        opacity: 0;
    }

    100% {
        transform: translateY(0);
        opacity: 1;
    }
`;

const BannerWrap = styled.div`
    width: 80%;
    border-radius: 20px;
    margin-top: 10px;
    height: auto;
    display: flex;
    background: url(${banner});
    background-repeat: no-repeat;
    justify-content: center;
    align-items: center;
    text-align: center;
    align-items: center;
    background-position: center;

    @media screen and (max-width: 500px) {
        width: 100%;
        border-radius: 0px;
        margin-top: 0px;
    }
`;

const BannerText = styled.div`
    margin-top: 0;
    width: 100%;
    height: 374px;
    display: flex;
    gap: 5px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    font-size: 24px;
    color: ${White};
    font-weight: 700;

    & > p {
        animation: ${moveInText} 1.5s ease-out;
    }

    & > div {
        opacity: 0;
        animation-delay: 2s;
        animation: ${moveInText} 1.5s forwards;
    }

    @media screen and (max-width: 1024px) {
        font-size: 2.5vw;
        height: 300px;
    }

    @media screen and (max-width: 768px) {
        font-size: 2vw;
        height: 180px;
    }

    @media screen and (max-width: 500px) {
        font-size: 5vw;
        height: 300px;
    }
`;
