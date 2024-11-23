import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Orange, Grey, DarkGrey } from '../../color';
import Bookmark from '../common/bookmark/BookmarkContainer';
import { useSaveBookmarkId } from '../../store';

const TopStoreCard = ({ image, alt, bookmarkId, id, address, name, keyword }) => {
    const navigate = useNavigate();
    const { savedStores } = useSaveBookmarkId();

    if (!bookmarkId) {
        const bookmark = savedStores.find((store) => store.storeResponseDto.storeId === id);
        bookmarkId = bookmark?.bookmarkId;
    }

    const cardClickHandler = (id) => {
        navigate(`/webmap/storeDetail/${id}`, { state: { detailVisible: true } });
    };
    return (
        <StoreCardContainer>
            <ImageContainer onClick={() => cardClickHandler(id)}>
                <img src={image} width="100%" height="auto" alt={alt} />
            </ImageContainer>
            <ContentsContainer>
                <Review>
                    <p>#{keyword}</p>
                </Review>
                <NameAndBookmarkContainer>
                    <p onClick={() => cardClickHandler(id)}>{name}</p>
                    <Bookmark bookmarkId={bookmarkId} storeId={id} />
                </NameAndBookmarkContainer>
                <Location>
                    <p>
                        <span>위치: </span>
                        {address}
                    </p>
                </Location>
            </ContentsContainer>
        </StoreCardContainer>
    );
};

export default TopStoreCard;

const StoreCardContainer = styled.div`
    width: 200px;
    height: 300px;
    border-radius: 10px;
    border-radius: 5px;
    position: relative;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
        & > p {
            color: ${Orange};
        }
        transform: scale(1.05);
    }

    box-shadow: 2px 2px 2px ${Grey};

    @media screen and (max-width: 1024px) {
        width: 100%;
        max-width: 300px;
        margin: 0 auto;
    }
`;

const ImageContainer = styled.div`
    width: 100%;
    height: 150px;
    overflow: hidden;

    & > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px 10px 0 0;
    }

    @media screen and (max-width: 500px) {
        max-width: 100%;
        margin: 0 auto;
    }
`;

const NameAndBookmarkContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    max-width: 100%;
    height: 30px;
    padding: 10px;

    & > p {
        font-size: 18px;
        text-align: center;
        font-weight: 600;
        padding-bottom: 10px;
    }

    & > div {
        color: ${Orange};
        font-size: 13px;
        display: flex;
        text-align: center;
        font-weight: bold;
    }

    @media screen and (max-width: 1024px) {
        & > img {
            max-width: 100%;
            height: auto;
            border-radius: 10px;
        }
    }
`;

const ContentsContainer = styled.div`
    width: 100%;
    padding: 10px;
    display: flex;
    gap: 10px;
    flex-direction: column;
`;

const Review = styled.div`
    font-weight: 600;
    font-size: 13px;
    height: 40px;
    color: ${DarkGrey};
`;

const Location = styled.div`
    & > p {
        font-size: 13px;
        color: ${DarkGrey};
    }
    & > p > span {
        font-size: 13px;
        color: black;
        font-weight: bold;
    }
`;
