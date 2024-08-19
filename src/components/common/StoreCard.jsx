import styled from 'styled-components';
import { Grey, Orange, White } from '../../color';
import React from 'react';
import { ReactComponent as Path } from '../../assets/Icon/Path.svg';
import { ReactComponent as PathMobile } from '../../assets/Icon/Path_Mobile.svg';

import { ReactComponent as Star } from '../../assets/Icon/Star.svg';
import { useNavigate } from 'react-router-dom';
const StoreCard = () => {
    const navigate = useNavigate();
    const cardClickHandler = () => {
        navigate('/webmap/storeDetail/1', { state: { detailVisible: true } });
    };
    return (
        <StoreCardLayout>
            <ImgBox>
                <img src="/images/default-food.jpg" alt="맛집 대표 사진" />
            </ImgBox>
            <ContentsBox>
                <NameAndPath>
                    <Name onClick={cardClickHandler}>맛있는 알고리즘</Name>
                    <button>
                        <Path />
                        경로
                    </button>
                    <PathMobile />
                </NameAndPath>
                <Location>위치 : 경기도 안양시 안양동 12</Location>
                <Rating>
                    <p>별점</p>
                    <Star />
                    <p>5.0</p>
                </Rating>
                <p>AI 분석결과 </p>
                <span>조용한, 양식, 외식, 감성, 와인, 스테이크</span>
            </ContentsBox>
        </StoreCardLayout>
    );
};
export default StoreCard;
const StoreCardLayout = styled.div`
    width: 500px;
    height: 250px;
    display: flex;
    flex-direction: row;
    gap: 20px;
    border-bottom: 1px solid ${Grey};
    @media screen and (max-width: 1024px) {
        max-width: 300px;
        height: auto;
    }
`;
const ImgBox = styled.div`
    width: 200px;
    height: 200px;
    margin-left: 10px;
    margin-top: 20px;
    border-radius: 20px;
    & > img {
        width: 200px;
        height: 200px;
        border-radius: 20px;
    }
    @media screen and (max-width: 1024px) {
        margin: 0px;
        display: flex;
        align-items: center;
        justify-content: center;
        & > img {
            width: 100px;
            height: 120px;
        }
    }
`;
const Location = styled.p`
    @media screen and (max-width: 1024px) {
        display: none;
    }
`;
const ContentsBox = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 10px;
    & > span {
        font-weight: 700;
    }
`;
const NameAndPath = styled.div`
    & > h1 {
        color: ${Orange};
    }
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 30px;
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
    & > p {
        color: ${Orange};
        font-weight: 600;
    }
    @media screen and (max-width: 1024px) {
        gap: 10px;
        & > svg {
            display: flex;
        }
        & > button {
            display: none;
            & > svg {
                display: none;
            }
        }
    }
`;
const Rating = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: flex-start;
    align-items: center;
`;

const Name = styled.p`
    cursor: pointer;
`;
