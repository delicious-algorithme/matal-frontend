import { ReactComponent as Bookmark } from '../../assets/Icon/detail/Bookmark.svg';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Orange, Grey, DarkGrey } from '../../color';
import { postBookmarkStore } from '../../apis/api/bookmarks';

const TopStoreCard = ({ image, alt, id, address, name, positiveRatio, keyword }) => {
    const navigate = useNavigate();

    const cardClickHandler = (id) => {
        navigate(`/webmap/storeDetail/${id}`, { state: { detailVisible: true } });
    };

    const handleClickBookmarks = async (e) => {
        const auth = JSON.parse(localStorage.getItem('auth')) || {};

        if (!auth.state.isLoggedIn) {
            navigate('/login');
        }

        console.log('storeId', id);
        const bookmarkForm = {
            id,
        };

        e.preventDefault();
        const response = await postBookmarkStore(bookmarkForm);
        console.log(response);
        if (response.status === 200) {
            navigate('/bookmark');
        } else {
            console.log(response.error);
        }
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
                <NameAndCategoryContainer>
                    <p onClick={() => cardClickHandler(id)}>{name}</p>
                    <BookmarkBox onClick={handleClickBookmarks}>
                        <Bookmark />
                    </BookmarkBox>
                </NameAndCategoryContainer>
                <PositiveRatio>
                    <p>
                        {positiveRatio}%<span> 긍정</span>
                    </p>
                </PositiveRatio>
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
    width: 300px;
    height: 400px;
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
    height: 200px;
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

const NameAndCategoryContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    max-width: 100%;
    height: 40px;
    border-bottom: 1px solid ${Orange};

    & > p {
        font-size: 21px;
        text-align: center;
        color: ${Orange};
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

const BookmarkBox = styled.div`
    display: flex;
    justify-content: end;
`;

const PositiveRatio = styled.div`
    font-size: 14px;
    & > p {
        color: ${Orange};
        font-weight: bold;
        & > span {
            color: black;
        }
    }
`;

const Location = styled.div`
    & > p {
        font-size: 14px;
    }
    & > p > span {
        font-weight: bold;
    }
`;
