import styled from 'styled-components';
import { DartkGrey, Grey, Orange, White } from '../../color';
import React, { useState, useEffect } from 'react';
import { ReactComponent as Path } from '../../assets/Icon/Path.svg';
import { ReactComponent as Star } from '../../assets/Icon/Star.svg';
import { ReactComponent as Close } from '../../assets/Icon/Close.svg';
const StoreDetail = () => {
    const [data, setData] = useState('');
    const [openingHours, setHours] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3000/data/mockData.json', {
            headers: {
                Accept: 'application/json',
            },
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                const hoursArray = data.businessHours;
                setHours(hoursArray);
            })
            .catch((error) => {
                console.error('Error', error);
            });
    }, []);
    console.log(openingHours);

    return (
        <StoreContainer>
            <Close />
            <StoreMainBox>
                <Image>
                    <img src="/images/default-food.jpg" />
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
                            {openingHours &&
                                openingHours.map((item, index) => {
                                    return <div>{item}</div>;
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
                            <div></div>
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
    right: 10%;
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
