import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Banner } from '../assets/Icon/banner/Banner.svg';
import { useIsFetch } from '../store';
import { CategoryAndMap, SearchKeyword, TopRecommendations } from '../components/main';
import { SearchBar, Button, Footer, Header } from '../components/common';

const MainPage = () => {
    const [searchInput, setSearchInput] = useState();
    const navigate = useNavigate();
    const { setIsFetchAll } = useIsFetch();

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

    const buttonClickHandler = () => {
        navigate('/webmap');
    };

    return (
        <>
            <MainPageLayout>
                <Header />
                <BannerContainer>
                    <Banner />
                </BannerContainer>

                <SearchBar
                    searchInput={searchInput}
                    onChangeHandler={onChangeHandler}
                    onKeyDownHandler={onKeyDownHandler}
                />
                <SearchKeyword />
                <Button color="white" text="식당 찾아 보기" onClickHandler={buttonClickHandler} />
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
    @media screen and (max-width: 1024px) {
        gap: 10px;
        & > svg {
            width: 250px;
            height: 150px;
        }
    }
`;

const BannerContainer = styled.div`
    & > svg {
        width: 100%;
        height: 200%;
    }
    @media screen and (max-width: 768px) {
        & > svg {
            display: none;
        }
    }
`;
