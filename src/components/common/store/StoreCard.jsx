import styled from 'styled-components';
import Bookmark from '../bookmark/BookmarkContainer';
import { ReactComponent as Star } from '../../../assets/Icon/detail/Star.svg';
import { DarkGreen, DarkGrey, LightGrey, Orange } from '../../../color';
import { LocationOn } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSaveBookmarkId } from '../../../store';

const StoreListCard = ({ image, alt, id, name, address, rating, positiveRatio, positiveKeywords }) => {
    const navigate = useNavigate();
    const { savedStores } = useSaveBookmarkId();

    const bookmark = savedStores.find((store) => store.storeResponseDto.storeId === id);
    const bookmarkId = bookmark?.bookmarkId;

    const cardClickHandler = () => {
        navigate(`/webmap/storeDetail/${id}`);
    };

    return (
        <StoreListCardLayout>
            <ContentsContainer onClick={() => cardClickHandler(id)}>
                <ImageContainer>
                    <StyledImage src={image} alt={alt} />
                </ImageContainer>
                <ContentsBox>
                    <NameAndBookmarkContainer>
                        <p>{name}</p>
                        <Bookmark bookmarkId={bookmarkId} storeId={id} />
                    </NameAndBookmarkContainer>
                    <RatingContainer>
                        <Star />
                        <p>{rating}</p>
                        <PositiveRatioContainer>
                            <p>
                                <span>{positiveRatio}%</span> AI 긍정 리뷰 비율
                            </p>
                        </PositiveRatioContainer>
                    </RatingContainer>
                    <PositiveKeywordsBox>
                        <p># {positiveKeywords}</p>
                    </PositiveKeywordsBox>
                    <LocationBox>
                        <LocationOn />
                        <p>{address}</p>
                    </LocationBox>
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

const ContentsBox = styled.div`
    width: 280px;
    padding-left: 5px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const LocationBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    & > svg {
        color: ${DarkGrey};
        width: 16px;
        height: 16px;
    }

    font-size: 14px;
`;

const NameAndBookmarkContainer = styled.div`
    height: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    & > p {
        font-weight: 700;
        font-size: 19px;
    }
`;

const RatingContainer = styled.div`
    display: flex;
    align-items: center;
    width: 220px;
    gap: 10px;
    justify-content: flex-start;

    & > svg {
        width: 16px;
        height: 16px;
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
    font-weight: 600;
    font-size: 14px;
    & > p {
        color: ${DarkGrey};
    }

    & p > span {
        font-size: 16px;
        font-weight: 700;
        color: ${Orange};
    }
`;
