import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Orange, Grey, DarkGrey } from '../../color';
import Bookmark from '../common/bookmark/BookmarkContainer';
import { Keyword } from '../common';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';

const TopStoreCard = ({ image, alt, storeId, address, name, keyword }) => {
    const navigate = useNavigate();

    const cardClickHandler = (storeId) => {
        navigate(`/webmap/storeDetail/${storeId}`, { state: { detailVisible: true } });
    };
    return (
        <StoreCardContainer>
            <ImageContainer onClick={() => cardClickHandler(storeId)}>
                <img src={image} width="100%" height="auto" alt={alt} />
            </ImageContainer>
            <ContentsContainer>
                <Keyword keyword={keyword} mode="card" type="positive" />
                <NameAndBookmarkContainer>
                    <p onClick={() => cardClickHandler(storeId)}>{name}</p>
                    <Bookmark storeId={storeId} />
                </NameAndBookmarkContainer>
                <LocationBox>
                    <PlaceOutlinedIcon />
                    <p>{address}</p>
                </LocationBox>
            </ContentsContainer>
        </StoreCardContainer>
    );
};

export default TopStoreCard;

const StoreCardContainer = styled.div`
    width: 300px;
    height: 320px;
    border-radius: 10px;
    border-radius: 5px;
    position: relative;
    transition: all 0.3s ease;

    &:hover {
        transform: scale(1.05);
    }

    box-shadow: 2px 2px 2px ${Grey};

    @media screen and (max-width: 1024px) {
        width: 100%;
        max-width: 300px;
        height: 350px;
        margin: 0 auto;
    }

    @media screen and (max-width: 768px) {
        width: 100%;
        max-width: 300px;
        height: 300px;
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
        &:hover {
            cursor: pointer;
        }
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
    height: 35px;

    & > p {
        font-size: 18px;
        text-align: center;
        display: flex;
        align-items: center;
        font-weight: 600;
        &:hover {
            transform: scale(1.05);
            cursor: pointer;
        }
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

const LocationBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;

    & > svg {
        width: 16px;
        height: 16px;
    }

    color: ${DarkGrey};
    font-size: 14px;

    @media screen and (max-width: 500px) {
        font-size: 12px;
        margin-top: 0px;
    }
`;
