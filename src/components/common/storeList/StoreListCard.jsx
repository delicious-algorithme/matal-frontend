import styled from 'styled-components';
import Bookmark from '../bookmark/BookmarkContainer';
import { DarkGreen, DarkGrey, LightGrey, Orange } from '../../../color';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { useNavigate } from 'react-router-dom';
import Keyword from '../keyword/Keyword';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

const StoreListCard = ({ image, alt, id, name, address, rating, positiveRatio, positiveKeywords }) => {
    const navigate = useNavigate();

    const cardClickHandler = () => {
        navigate(`/webmap/storeDetail/${id}`);
    };

    return (
        <StoreListCardLayout>
            <ContentsContainer>
                <ImageContainer onClick={() => cardClickHandler(id)}>
                    <StyledImage src={image} alt={alt} />
                </ImageContainer>
                <ContentsBox>
                    <NameAndBookmarkContainer>
                        <p onClick={() => cardClickHandler(id)}>{name}</p>
                        <Bookmark storeId={id} />
                    </NameAndBookmarkContainer>
                    <RatingContainer>
                        <StarRoundedIcon />
                        <p>{rating}</p>
                        <PositiveRatioContainer>
                            <p>
                                <span>{positiveRatio}%</span>
                                긍정 비율
                            </p>
                        </PositiveRatioContainer>
                    </RatingContainer>
                    <KeywordAndLocationBox>
                        <PositiveKeywordsBox>
                            <Keyword keyword={positiveKeywords} mode="card" type="positive" />
                        </PositiveKeywordsBox>
                        <LocationBox>
                            <PlaceOutlinedIcon />
                            <p>{address}</p>
                        </LocationBox>
                    </KeywordAndLocationBox>
                </ContentsBox>
            </ContentsContainer>
        </StoreListCardLayout>
    );
};

export default StoreListCard;

const StoreListCardLayout = styled.div`
    width: 100%;
    height: 190px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    border-top: 1px solid ${LightGrey};

    &:hover {
        background-color: ${LightGrey};
    }

    @media screen and (max-width: 500px) {
        flex-direction: column;
        align-items: flex-start;
        height: 140px;
        width: 425px;
    }

    @media screen and (max-width: 400px) {
        flex-direction: column;
        align-items: flex-start;
        height: 140px;
        width: 390px;
    }

    @media screen and (max-width: 370px) {
        flex-direction: column;
        align-items: flex-start;
        height: 140px;
        width: 360px;
    }

    @media screen and (max-width: 350px) {
        flex-direction: column;
        align-items: flex-start;
        height: 160px;
        width: 320px;
    }
`;

const ContentsContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
`;

const KeywordAndLocationBox = styled.div``;

const ImageContainer = styled.div`
    width: 150px;
    height: 150px;
    overflow: hidden;
    flex-shrink: 0;
    border-radius: 10px;
    display: flex;

    @media screen and (max-width: 500px) {
        width: 100px;
        height: 100px;
    }
`;

const StyledImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const ContentsBox = styled.div`
    width: 100%;
    padding-left: 5px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    @media screen and (max-width: 500px) {
        gap: 5px;
    }
`;

const LocationBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;

    & > svg {
        color: ${DarkGrey};
        width: 16px;
        height: 16px;
    }

    color: ${DarkGrey};
    font-size: 14px;

    @media screen and (max-width: 500px) {
        & > svg {
            color: ${DarkGrey};
            width: 12px;
            height: 12px;
        }

        font-size: 12px;
        margin-top: 10px;
    }
`;

const NameAndBookmarkContainer = styled.div`
    height: 30px;
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    & > p {
        font-weight: 700;
        font-size: 19px;
        &:hover {
            cursor: pointer;
            font-size: 20px;
        }
    }

    @media screen and (max-width: 500px) {
        & > p {
            font-weight: 700;
            font-size: 16px;
        }
        height: 20px;
    }
`;

const RatingContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: flex-start;

    & > svg {
        width: 16px;
        height: 16px;
        color: ${Orange};
    }

    & > p {
        font-weight: 600;
        font-size: 16px;
    }
`;

const PositiveKeywordsBox = styled.div`
    color: ${DarkGreen};
    font-size: 14px;
    padding-left: 2px;
`;

const PositiveRatioContainer = styled.div`
    font-weight: 500;
    font-size: 14px;

    & > p {
        display: flex;
        gap: 5px;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: ${DarkGrey};
    }

    & p > span {
        font-size: 16px;
        font-weight: 700;
        color: ${Orange};
    }

    @media screen and (max-width: 500px) {
        font-size: 12px;
        & > p {
            color: ${DarkGrey};
        }

        & p > span {
            font-size: 16px;
            font-weight: 700;
            color: ${Orange};
        }
    }
`;
