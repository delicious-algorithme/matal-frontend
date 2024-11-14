import styled from 'styled-components';
import Bookmark from '../bookmark/Bookmark';
import { Star } from '@mui/icons-material';
import { LightGrey, Orange } from '../../../color';

const StoreListCard = ({ image, alt, id, name, address, storLink, rating, positiveRatio, positiveKeyword }) => {
    const cardClickHandler = () => {};
    return (
        <StoreListCardLayout>
            <ContentsContainer>
                <ImageContainer onClick={() => cardClickHandler(id)}>
                    <StyledImage src={image} alt={alt} />
                </ImageContainer>
                <NameAndBookmarkContainer>
                    <p>{name}</p>
                    <Bookmark />
                </NameAndBookmarkContainer>
            </ContentsContainer>
            <RatingContainer>
                <Star />
                <p>{rating}</p>
            </RatingContainer>
            <PositiveRatioContainer>
                <p>
                    AI 긍정 리뷰 비율: <span>{positiveRatio}</span>%
                </p>
            </PositiveRatioContainer>
        </StoreListCardLayout>
    );
};

export default StoreListCard;

const StoreListCardLayout = styled.div`
    width: 100%;
    height: 220px;
    padding: 10px;
    border-top: 1px solid ${LightGrey};

    &:hover {
        cursor: pointer;
        background-color: ${LightGrey};
    }
`;

const ContentsContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const ImageContainer = styled.div`
    width: 150px;
    height: 150px;
    overflow: hidden;
    flex-shrink: 0;
    border-radius: 10px;
`;

const StyledImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const NameAndBookmarkContainer = styled.div`
    width: 100%;
    height: 50px;
    padding-left: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    & > p {
        color: ${Orange};
        font-weight: 500;
        font-size: 17px;
    }
`;

const RatingContainer = styled.div`
    display: flex;
    align-items: center;
    width: 150px;
    justify-content: flex-end;
    & > svg {
        color: ${Orange};
        width: 16px;
        height: 16px;
    }
    & > p {
        font-weight: 600;
        font-size: 16px;
    }
`;

const PositiveRatioContainer = styled.div`
    font-weight: 600;
    & p > span {
        font-weight: 700;
        color: ${Orange};
    }
`;
