import styled from 'styled-components';
import { DartkGrey, Grey, Orange, White } from '../../color';
import React from 'react';
import { ReactComponent as Path } from '../../assets/Icon/Path.svg';
import { ReactComponent as Star } from '../../assets/Icon/Star.svg';
import { ReactComponent as Close } from '../../assets/Icon/Close.svg';

const data = {
    id: 1,
    image: '',
    keyword: '서울시 냉면',
    name: '맛있는 알고리즘',
    address: '서울 종로구 광화문로 1길 234 5층',
    rating: 4.5,
    category: '냉면',
    reviewCount: '999',
    nearbyStation: '2,5호선 을지로9가역 1번 출구에서 239m',
    phone: '02-1234-5678',
    businessHours: [
        '토: 11:30 - 21:00 20:40 라스트오더',
        '일: 11:30 - 21:00 20:40 라스트오더',
        '월: 정기휴무 (매주 월요일)',
        '화: 11:30 - 21:00 20:40 라스트오더',
        '수: 11:30 - 21:00 20:40 라스트오더',
        '목: 11:30 - 21:00 20:40 라스트오더',
        '금: 11:30 - 21:00 20:40 라스트오더',
    ],
    latitude: '33.56821',
    longitude: '136.9971945',
    positiveKeywords: '진한 육수, 고소한 맛, 푸짐한 고명',
    reviewSummary: '진한 육수와 고소한 맛, 고명이 푸짐합니다. 가격이 비싸고 면이 평범하다는 의견도 있습니다.',
    positiveRatio: '68',
    nagativeRatio: '32',
};

const StoreDetail = () => {
    return (
        <StoreContainer>
            <CloseBox>
                <Close />
            </CloseBox>
            <StoreMainBox>
                <Image>
                    <img src="/images/default-food.jpg" alt="맛집 대표 사진" />
                </Image>
                <NameAndOters>
                    <NameAndPath>
                        <div>{data.name}</div>
                        <button>
                            <Path />
                            경로
                        </button>
                    </NameAndPath>
                    <CategoryAndReviewCount>
                        <Content>{data.category}</Content>
                        <div>
                            <Title>리뷰:</Title>
                            <Content>{data.reviewCount}</Content>
                        </div>
                    </CategoryAndReviewCount>
                    <Rating>
                        <Title>별점:</Title>
                        <Star />
                        <Content>{data.rating}</Content>
                    </Rating>
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
                        <Content>{data.address}</Content>
                    </div>
                    <div>
                        <Title>전화번호: </Title>
                        <Content>{data.phone}</Content>
                    </div>
                    <div>
                        <Title>영업시간:</Title>
                        <Hours>
                            {data.businessHours &&
                                data.businessHours.map((item, idx) => {
                                    return <div key={idx}>{item}</div>;
                                })}
                        </Hours>
                    </div>
                </StoreDetailBox>
                <StoreReviewBox>
                    <ReviewDetail>
                        <Title>AI분석 결과</Title>
                        <Content>{data.reviewSummary}</Content>
                    </ReviewDetail>
                    <ReviewRating>
                        <Title>긍정/부정 리뷰 비율</Title>
                        <RatingBar ratio={data.positiveRatio}>
                            <div />
                        </RatingBar>
                        <Content>이 식당의 긍정 리뷰 비율은 {data.positiveRatio}%입니다.</Content>
                    </ReviewRating>
                </StoreReviewBox>
            </StoreDetailContainer>
        </StoreContainer>
    );
};
export default StoreDetail;

const StoreContainer = styled.div`
    background-color: ${White};
    position: absolute;
    max-width: 750px;
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
        max-width: 400px;
        & > svg {
        }
    }
    @media screen and (max-width: 672px) {
        left: 5%;
    }
`;
const CloseBox = styled.div`
    position: absolute;
    right: 5px;
    top: 5px;
`;
const StoreMainBox = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    gap: 20px;
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
        width: 150px;
        height: 160px;
        & > img {
            width: 151px;
            height: 160px;
        }
    }
`;

const NameAndOters = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
`;
const NameAndPath = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 30px;
    & > div {
        font-weight: 600;
        font-size: 20px;
        color: ${Orange};
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
    @media screen and (max-width: 1024px) {
        display: flex;
        flex-direction: column;
        gap: 5px;
        & > div {
            padding-top: 10px;
            font-size: 16px;
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
    }

    :nth-child(2) {
        & > span {
            color: ${Orange};
        }
    }
`;
const Hours = styled.div`
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 1024px) {
        display: none;
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
    border: 2px solid ${Grey};
    background: ${White};
    & > div {
        width: ${(props) => props.ratio}%;
        height: 100%;
        border-radius: 30px;
        background-color: ${Grey};
    }
`;
const Title = styled.p`
    color: ${DartkGrey};
`;
const Content = styled.span``;
