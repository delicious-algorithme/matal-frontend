import styled from 'styled-components';
import { DartkGrey, Grey, Orange, White } from '../../color';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ReactComponent as Path } from '../../assets/Icon/Path.svg';
import { ReactComponent as Star } from '../../assets/Icon/Star.svg';
import { ReactComponent as Close } from '../../assets/Icon/Close.svg';
import { ReactComponent as PathMobile } from '../../assets/Icon/Path_Mobile.svg';
import { ReactComponent as SeeMore } from '../../assets/Icon/SeeMore.svg';
import { useParams } from 'react-router-dom';
import { getStoreDetail } from '../../apis/api/storeList';
import { useStoreList } from '../../store';

const StoreDetail = () => {
    const { id } = useParams();
    const storeId = id;
    const location = useLocation();
    const [visible, setVisible] = useState(true);
    const [isLoading, setIsLoading] = useState();
    const [store, setStore] = useState();
    const [hourVisible, setHourVisible] = useState(false);
    const { setStoreList } = useStoreList();
    const storeLinkHandler = () => {
        window.location.href = store.store_link;
    };
    useEffect(() => {
        if (storeId) {
            fetchStoreDetail(storeId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storeId]);
    useEffect(() => {
        if (location.state?.detailVisible) {
            setVisible(true);
        }
    }, [location.state]);
    const closeHandler = () => {
        setVisible(false);
        //console.log(visible);
    };
    const toggleHours = () => {
        setHourVisible(!hourVisible);
    };
    const fetchStoreDetail = async (storeId) => {
        setIsLoading(true);
        try {
            const response = await getStoreDetail({ storeId });
            const newData = response.data;
            if (typeof newData.business_hours === 'string') {
                try {
                    const jsonString = newData.business_hours.replace(/'/g, '"');
                    newData.business_hours = JSON.parse(jsonString);
                } catch (e) {
                    console.error('Failed to parse business_hours:', e);
                }
            }
            setStore(newData);
            setStoreList(newData);
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    };
    return (
        visible &&
        !isLoading &&
        store && (
            <StoreContainer>
                <CloseBox onClick={closeHandler}>
                    <Close />
                </CloseBox>
                <StoreMainBox>
                    <Image>
                        <img src={store.image_urls} alt="맛집 대표 사진" />
                    </Image>
                    <NameAndOters>
                        <NameAndPath>
                            <div>{store.keyword}</div>
                            <button onClick={storeLinkHandler}>
                                <Path />
                                경로
                            </button>
                            <PathMobile onClick={storeLinkHandler} />
                        </NameAndPath>
                        <CategoryAndReviewCount>
                            <Content>{store.category}</Content>
                            <div>
                                <Title>리뷰:</Title>
                                <Content>{store.reviews_count}</Content>
                            </div>
                        </CategoryAndReviewCount>
                        <Rating>
                            <Title>별점:</Title>
                            <Star />
                            <Content>{store.rating}</Content>
                        </Rating>
                        <KeywordMobile>
                            <p>AI 분석 긍정 키워드</p>
                            <p>{store.positive_keywords}</p>
                        </KeywordMobile>
                    </NameAndOters>
                </StoreMainBox>
                <StoreDetailAndReviewNav>
                    <div>개요</div>
                    <div>리뷰</div>
                </StoreDetailAndReviewNav>
                <StoreDetailContainer>
                    <StoreDetailBox>
                        <div>
                            <Title>주소: </Title>
                            <Content>{store.address}</Content>
                        </div>
                        <div>
                            <Title>전화번호: </Title>
                            <Content>{store.phone}</Content>
                        </div>
                        <div>
                            <Title>
                                영업시간:
                                <SeeMore onClick={toggleHours} />
                            </Title>
                            <Hours $visible={hourVisible}>
                                {Array.isArray(store.business_hours) &&
                                    store.business_hours.map((item, idx) => <div key={idx}>{item}</div>)}
                            </Hours>
                        </div>
                    </StoreDetailBox>
                    <StoreReviewBox>
                        <ReviewDetail>
                            <Keyword>
                                <Title>AI 분석 긍정 키워드</Title>
                                <span>{store.positive_keywords}</span>
                            </Keyword>
                            <Title>AI분석 결과</Title>
                            <Content>{store.review_summary}</Content>
                        </ReviewDetail>
                        <ReviewRating>
                            <Title>긍정/부정 리뷰 비율</Title>
                            <RatingBar ratio={store.positive_ratio}>
                                <div />
                            </RatingBar>
                            <Content>이 식당의 긍정 리뷰 비율은 {store.positive_ratio}%입니다.</Content>
                        </ReviewRating>
                    </StoreReviewBox>
                </StoreDetailContainer>
            </StoreContainer>
        )
    );
};
export default StoreDetail;

const StoreContainer = styled.div`
    background-color: ${White};
    position: absolute;
    max-width: 650px;
    top: 30%;
    right: 20%;
    margin: 0;
    border-radius: 20px;
    box-shadow: 1px 1px solid ${Grey};
    font-size: 16px;
    z-index: 100;
    & > svg {
        position: relative;
        top: 10px;
        left: 250px;
    }
    @media screen and (max-width: 1024px) {
        font-size: 14px;
        top: 30%;
        left: 20%;
        width: 60%;
        & > svg {
        }
    }
    @media screen and (max-width: 672px) {
        left: 10%;
        width: 80%;
    }
`;
const CloseBox = styled.div`
    position: absolute;
    right: 5px;
    top: 5px;
    cursor: pointer;
`;
const StoreMainBox = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    gap: 20px;
    @media screen and (max-width: 672px) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;
const Image = styled.div`
    width: 300px;
    height: 200px;
    margin-left: 20px;
    border-radius: 20px;
    background-color: ${Grey};
    & > img {
        width: 300px;
        height: 200px;
        border-radius: 20px;
    }
    @media screen and (max-width: 1024px) {
        width: 40%;
        height: 160px;
        & > img {
            width: 100%;
            height: 160px;
        }
    }
    @media screen and (max-width: 672px) {
        width: 60%;
        margin-left: 0px;
        & > img {
            width: 100%;
            height: 160px;
        }
    }
`;

const NameAndOters = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    @media screen and (max-width: 1024px) {
        gap: 5px;
    }
`;
const NameAndPath = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 30px;
    & > div {
        font-weight: 700;
        font-size: 20px;
        cursor: pointer;
    }
    & > button {
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${Orange};
        gap: 10px;
        width: 90px;
        height: 40px;
        font-size: 16px;
        border-radius: 20px;
        border: 1px solid ${Orange};
        background-color: ${White};
        & > svg {
            width: 15px;
        }
        cursor: pointer;
    }
    & > svg {
        display: none;
    }
    @media screen and (max-width: 1024px) {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        gap: 5px;
        & > button {
            display: none;
        }
        display: flex;
        //justify-content: center;
        align-items: center;
        & > svg {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
`;
const CategoryAndReviewCount = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 30px;
    & > div {
        display: flex;
        flex-direction: row;
        gap: 10px;
    }
`;
const Rating = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
`;

const StoreDetailAndReviewNav = styled.div`
    display: flex;
    margin-top: 10px;
    flex-direction: row;
    width: 100%;
    height: 70px;
    font-size: 18px;
    border: 1px solid ${Grey};
    justify-content: space-between;
    & > div {
        display: flex;
        width: 50%;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    gap: 50px;
    @media screen and (max-width: 1024px) {
        display: none;
    }
`;
const StoreDetailContainer = styled.div`
    margin: 10px;
    display: flex;
    flex-direction: row;
    gap: 20px;
`;
const StoreDetailBox = styled.div`
    width: 50%;
    display: flex;
    gap: 20px;
    flex-direction: column;
    align-items: flex-start;
    & > div {
        display: flex;
        //flex-direction: row;
        & > svg {
            display: none;
        }
    }
    :nth-child(2) {
        & > span {
            color: ${Orange};
        }
    }
    @media screen and (max-width: 1024px) {
        :first-child {
            & > p {
                display: none;
            }
        }
        & > div {
            & > svg {
                display: block;
            }
        }
    }
`;
const Hours = styled.div`
    display: flex;
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 1024px) {
        max-width: 140px;
        display: ${(props) => (props.$visible ? 'flex' : 'none')};
    }
`;
const StoreReviewBox = styled.div`
    width: 50%;
    display: flex;
    gap: 20px;
    flex-direction: column;
`;
const ReviewDetail = styled.div`
    display: flex;
    gap: 10px;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
    border-radius: 20px;
    border: 1px solid ${Orange};
    & > p {
        color: ${Orange};
    }
    & > div > p {
        color: ${Orange};
    }
    @media screen and (max-width: 1024px) {
        border: none;
        padding: 0px;
    }
`;
const ReviewRating = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    :last-child {
        color: ${Orange};
        font-size: 13px;
    }
`;
const RatingBar = styled.div`
    width: 80%;
    height: 30px;
    border-radius: 30px;
    border: 2px solid ${Orange};
    background: ${White};
    & > div {
        width: ${(props) => props.ratio}%;
        height: 100%;
        border-radius: 30px;
        background-color: ${Orange};
    }
`;
const Title = styled.p`
    color: ${DartkGrey};
    & > svg {
        display: none;
    }
    @media screen and (max-width: 1024px) {
        display: flex;
        align-items: center;
        & > svg {
            display: flex;
        }
    }
`;
const Content = styled.span``;

const Keyword = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    :last-child {
        font-weight: 700;
    }
    @media screen and (max-width: 1024px) {
        display: none;
    }
`;

const KeywordMobile = styled.div`
    display: none;
    flex-direction: column;
    gap: 5px;
    :first-child {
        color: ${Orange};
    }
    :last-child {
        font-weight: 700;
    }
    @media screen and (max-width: 1024px) {
        display: flex;
    }
`;
