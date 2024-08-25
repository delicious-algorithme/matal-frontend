import styled from 'styled-components';
import { Grey, Orange, White } from '../../color';
import React from 'react';
import { ReactComponent as Path } from '../../assets/Icon/Path.svg';
import { ReactComponent as PathMobile } from '../../assets/Icon/Path_Mobile.svg';
import { ReactComponent as Star } from '../../assets/Icon/Star.svg';
import { useNavigate } from 'react-router-dom';
//storeList에서 필요한 값 props로 받는다.
const StoreCard = ({ id, image, name, rating, address, positiveKeywords, storeLink }) => {
    const navigate = useNavigate();
    const cardClickHandler = () => {
        navigate(`/webmap/storeDetail/${id}`, { state: { detailVisible: true } });
    };
    const storeLinkHandler = () => {
        window.location.href = storeLink;
    };
    return (
        <StoreCardLayout>
            <ImgBox>
                <img src={image} alt="맛집 대표 사진" />
            </ImgBox>
            <ContentsBox>
                <NameAndPath>
                    <Name onClick={cardClickHandler}>{name}</Name>
                    <button onClick={storeLinkHandler}>
                        <Path />
                        경로
                    </button>
                    <PathMobile onClick={storeLinkHandler} />
                </NameAndPath>
                <Location>위치 : {address}</Location>
                <Rating>
                    <p>별점 </p>
                    <Star />
                    <p>{rating}</p>
                </Rating>
                <p>AI 분석결과 </p>
                <span>{positiveKeywords}</span>
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
        width: 300px;
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
        display: flex;
        align-items: center;
        justify-content: center;
        width: 150px;
        margin-left: 10px;
        & > img {
            width: 150px;
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
