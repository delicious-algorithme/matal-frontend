import styled from 'styled-components';
import { DarkGrey, Grey, LightGrey, Orange } from '../../color';
import { LocationButton } from '../common';
import { ReactComponent as StarIcon } from '../../assets/Icon/detail/Star.svg';
import { LocationOn } from '@mui/icons-material';

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
                        <CategoryText>{store.category} </CategoryText>
                        <StarBox>
                            <StarIcon />
                            <p>{store.rating} </p>
                        </StarBox>
                        <RiviewCountText>리뷰 {store.reviewsCount}개 </RiviewCountText>
                        <p>
                            <RatioText>{store.positiveRatio}</RatioText>% 긍정비율
                        </p>
                    </div>
                    <StationBox>
                        <LocationOn />
                        <p>{store.nearbyStation}</p>
                    </StationBox>
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
    padding-bottom: 20px;
    border-bottom: 1px solid ${Grey};
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

    @media screen and (max-width: 768px) {
        border-radius: 0px;
        & > img {
            border-radius: 0px;
        }
    }
`;

const NameAndCategoryBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 10px;

    & > h1 {
        font-weight: 700;
    }

    @media screen and (max-width: 768px) {
        & > h1 {
            font-size: 24px;
            font-weight: 700;
        }
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
    flex-direction: column;
    gap: 10px;

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
    }

    & > p {
        text-align: left;
        font-size: 16px;
        color: ${DarkGrey};
    }

    @media screen and (max-width: 1024px) {
        flex-direction: column;
        & > div {
            display: flex;
            height: 20px;
            gap: 10px;
            flex-direction: row;
            justify-content: flex-start;
            align-items: flex-start;
            text-align: left;
            & > div > p {
                font-size: 16px;
                display: flex;
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

const RatioText = styled.span`
    color: ${Orange};
    font-weight: 700;
`;

const CategoryText = styled.p`
    color: ${DarkGrey};
`;

const StationBox = styled.div`
    & > svg {
        color: ${LightGrey};
    }
`;

const RiviewCountText = styled.p`
    @media screen and (max-width: 1024px) {
        display: none;
    }
`;
