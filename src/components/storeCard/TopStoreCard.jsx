import { ReactComponent as Bookmark } from '../../assets/Icon/detail/Bookmark.svg';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Orange, Grey } from '../../color';
const TopStoreCard = ({ image, alt, id, name, positiveRatio, keyword }) => {
    const navigate = useNavigate();

    const cardClickHandler = (id) => {
        navigate(`/webmap/storeDetail/${id}`, { state: { detailVisible: true } });
    };

    return (
        <StoreCardContainer onClick={() => cardClickHandler(id)}>
            <img src={image} width="100%" height="auto" alt={alt} />
            <NameAndCategoryContainer>
                <p>{name}</p>
                <span>{positiveRatio}</span>
            </NameAndCategoryContainer>
            <Review>
                <p>{keyword}</p>
            </Review>
            <BookmarkBox>
                <Bookmark />
            </BookmarkBox>
        </StoreCardContainer>
    );
};
export default TopStoreCard;

const StoreCardContainer = styled.div`
    width: 100%;
    height: auto;
    border-radius: 10px;
    cursor: pointer;

    &:hover {
        & > p {
            color: ${Orange};
        }
    }

    & > img {
        max-width: 100%;
        height: 200px;
        border-radius: 10px 10px 0px 0;
    }
    box-shadow: 2px 2px 2px ${Grey};
    @media screen and (max-width: 1024px) {
        max-width: 100%;
        margin: 0 auto;
    }
`;
const NameAndCategoryContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    max-width: 100%;
    margin: 10px;

    border-bottom: 1px solid ${Orange};

    & > p {
        margin: 10px 0 5px;
        font-size: 20px;
        font-weight: bold;
    }

    & > span {
        color: ${Orange};
        font-size: 16px;
    }

    @media screen and (max-width: 1024px) {
        & > img {
            max-width: 100%;
            height: auto;
            border-radius: 10px;
        }
    }
`;

const Review = styled.div`
    padding: 10px;
`;

const BookmarkBox = styled.div`
    display: flex;
    justify-content: end;
    padding: 10px;
`;
