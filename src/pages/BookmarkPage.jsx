import styled from 'styled-components';
import { Bookmarks } from '../components/bookmark';
import { DarkGreen } from '../color';

const BookmarkPage = () => {
    return (
        <BookmarkLayout>
            <Title>
                <p>내가 찜한 가게</p>
            </Title>
            <BookmarkContainer>
                <Bookmarks />
            </BookmarkContainer>
        </BookmarkLayout>
    );
};

export default BookmarkPage;

const BookmarkLayout = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 30px;
    display: flex;
    justify-items: center;
    align-items: center;
    flex-direction: column;
`;

const BookmarkContainer = styled.div`
    width: 80%;
    display: flex;
    justify-items: center;
    align-items: center;
`;

const Title = styled.h3`
    width: 80%;
    margin-bottom: 30px;
    color: ${DarkGreen};
    font-size: 18px;
    display: flex;
    justify-items: center;
    align-items: center;
    padding-bottom: 10px;

    & > p {
        border-bottom: 2px solid ${DarkGreen};
    }
`;
