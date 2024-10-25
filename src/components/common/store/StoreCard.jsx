import styled from 'styled-components';
import { Grey, Orange, White } from '../../../color';
import React from 'react';
import { ReactComponent as Path } from '../../../assets/Icon/detail/Path.svg';
import { ReactComponent as PathMobile } from '../../../assets/Icon/detail/Path_Mobile.svg';
import { ReactComponent as Star } from '../../../assets/Icon/detail/Star.svg';
import { useNavigate } from 'react-router-dom';
import { useStoreDetail } from '../../../store';

const StoreCard = ({ id, image, name, rating, address, positiveKeywords, storeLink, positiveRatio }) => {
    const navigate = useNavigate();

    const { toggleStoreDetailPage } = useStoreDetail();
    const cardClickHandler = () => {
        toggleStoreDetailPage();
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
                <ReviewBox>
                    <div>
                        <p>별점 </p>
                        <Star />
                        <h4>{rating}</h4>
                    </div>
                    <div>
                        <p>AI 리뷰 긍정비율 </p>
                        <h4>{positiveRatio}%</h4>
                    </div>
                </ReviewBox>
                <p>AI 분석결과 </p>
                <h4>{positiveKeywords}</h4>
            </ContentsBox>
        </StoreCardLayout>
    );
};

export default StoreCard;

const StoreCardLayout = styled.div`
    width: 100%;
    height: 250px;
    display: flex;
    flex-direction: row;
    gap: 20px;
    border-bottom: 1px solid ${Grey};
    @media screen and (max-width: 1024px) {
        width: 100%;
        height: auto;
        gap: 10px;
        flex-direction: column;
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
        height: 120px;
        margin-top: 10px;
        margin-left: 0px;
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
    @media screen and (max-width: 1024px) {
        margin-bottom: 10px;
        & > p {
            max-width: 100px;
            overflow: scroll;
        }
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

const ReviewBox = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: flex-start;
    & > div {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;
    }
    @media screen and (max-width: 1024px) {
        flex-direction: column;
    }
`;

const Name = styled.p`
    cursor: pointer;
`;
