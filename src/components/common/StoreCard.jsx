import styled from 'styled-components';
import { Grey, Orange, White } from '../../color';
import React, { useState, useEffect } from 'react';
import { ReactComponent as Path } from '../../assets/Icon/Path.svg';
import { ReactComponent as Star } from '../../assets/Icon/Star.svg';
const StoreCard = () => {
    return (
        <StoreCardLayout>
            <ImgBox>
                <img src="/images/default-food.jpg" />
            </ImgBox>
            <ContentsBox>
                <NameAndPath>
                    <p>맛좋은 알고리즘</p>
                    <button>
                        <Path />
                        경로
                    </button>
                </NameAndPath>
                <p>위치 : 경기도 안양시 안양동 12</p>
                <Rating>
                    <p>별점</p>
                    <Star />
                    <p>5.0</p>
                </Rating>
                <p>AI 분석결과 </p>
                <p>조용한, 양식, 외식, 감성, 와인, 스테이크</p>
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
`;
const ImgBox = styled.div`
    width: 200px;
    height: 200px;
    margin-left: 10px;
    margin-bottom: 20px;
    border-radius: 20px;
    & > img {
        width: 200px;
        height: 200px;
        border-radius: 20px;
    }
`;
const ContentsBox = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 10px;
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
`;
const Rating = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: flex-start;
    align-items: center;
`;