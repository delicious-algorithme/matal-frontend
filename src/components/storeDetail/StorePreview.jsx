import styled from 'styled-components';
import { DarkGrey, Orange } from '../../color';
import { LocationButton } from '../common';
import { ReactComponent as StarIcon } from '../../assets/Icon/detail/Star.svg';

const StorePreview = ({ store }) => {
    const pathClickHandler = () => {
        window.location.href = store.storeLink;
    };

    return (
        <StorePreviewContainer>
            <ImageContainer>
                <ImageBox>
                    <img src={store.imageUrl} alt="가게 이미지" />
                </ImageBox>
            </ImageContainer>
            <ContentsBox>
                <NameAndCategoryBox>
                    <h1>{store.name} </h1>
                    <LocationButton pathClickHandler={pathClickHandler} />
                </NameAndCategoryBox>
                <RatingBox>
                    <div>
                        <p>{store.category} </p>
                        <StarBox>
                            <StarIcon />
                            <p>{store.rating} </p>
                        </StarBox>
                        <p>리뷰 {store.reviewsCount}개 </p>
                    </div>
                    <div>
                        <p>{store.nearbyStation}</p>
                        <p>
                            <span>{store.positiveRatio}</span>% 긍정비율
                        </p>
                    </div>
                </RatingBox>
            </ContentsBox>
        </StorePreviewContainer>
    );
};

export default StorePreview;

const StorePreviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    border-bottom: 1px solid ${Orange};
`;

const ImageContainer = styled.div`
    width: 100%;
    display: flex;
`;

const ImageBox = styled.div`
    width: 100%;
    max-height: 400px;
    border-radius: 10px;
    overflow: hidden;

    & > img {
        border-radius: 10px;
        width: 100%;
        max-width: 400px;
        object-fit: cover;
    }
`;

const NameAndCategoryBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 10px;

    & > h1 {
        font-weight: 500;
        color: ${Orange};
    }
`;

const ContentsBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-top: 20px;
    width: 80%;
    padding-bottom: 10px;
    gap: 10px;
    font-weight: 500;
`;

const RatingBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;

    & > div > svg {
        width: 20px;
        height: 20px;
        color: ${Orange};
    }

    & > div {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
        & > div > p {
            font-size: 18px;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
        }
    }

    & > p {
        text-align: left;
        font-size: 16px;
        color: ${DarkGrey};
    }

    & > p > span {
        font-size: 18px;
        font-weight: 700;
        color: ${Orange};
    }

    @media screen and (max-width: 1024px) {
        flex-direction: column;
        & > div {
            display: flex;
            height: 30px;
            gap: 10px;
            flex-direction: row;
            align-items: center;
            text-align: center;

            & > div > p {
                font-size: 18px;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
            }
        }
    }
`;

const StarBox = styled.div`
    display: flex;
    flex-direction: row;
    font-weight: 600;
    justify-content: center;
    align-items: center;

    & > svg {
        width: 16px;
        height: 16px;
    }
`;
