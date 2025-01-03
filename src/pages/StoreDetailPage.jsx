import styled from 'styled-components';
import { useStoreDetail } from '../store';
import { useState, useEffect, useCallback } from 'react';
import {
    StorePreview,
    StoreMap,
    StoreInsight,
    StoreMenues,
    StoreOverview,
    ReviewDetail,
    StoreTip,
} from '../components/storeDetail';
import { Grey, LightGrey, White } from '../color';
import { Footer, Loading, Button } from '../components/common';
import { useNavigate, useParams } from 'react-router-dom';
import { getStoreDetail } from '../apis/api/getStoreDetail';
import { useSaveBookmarkId } from '../store';
import Bookmark from '../components/common/bookmark/BookmarkContainer';

const StoreDetailPage = () => {
    const [item, setItem] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const storeId = Number(id);
    const { setStoreDetail } = useStoreDetail();
    const { savedStores } = useSaveBookmarkId();

    const bookmark = savedStores.find((store) => store.storeResponseDto.storeId === storeId);

    const bookmarkId = bookmark?.bookmarkId;

    const fetchStoreDetail = async (storeId) => {
        setIsLoading(true);
        try {
            const response = await getStoreDetail({ storeId });
            const newData = response.data;
            if (typeof newData.businessHours === 'string') {
                try {
                    const jsonString = newData.businessHours.replace(/'/g, '"');
                    newData.businessHours = JSON.parse(jsonString);
                } catch (e) {
                    console.error('Failed to parse business_hours:', e);
                }
            }
            setItem(newData);
            setStoreDetail(newData);
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (storeId) {
            if (!item.id || item.id !== storeId) {
                fetchStoreDetail(storeId);
            }
        }
        // eslint-disable-next-line
    }, [storeId, item.id]);

    const buttonClickHandler = useCallback(() => {
        navigate('/webmap');
    }, [navigate]);

    const { toggleStoreDetailPage, isStoreDetailPage } = useStoreDetail();

    if (!isStoreDetailPage) {
        toggleStoreDetailPage();
    }

    return (
        <>
            <ButtonBox>
                <Button onClickHandler={buttonClickHandler} text="식당 둘러보기" color="orange" visible={true} />
                <h4>{item.name}</h4>
            </ButtonBox>
            {!isLoading && (
                <DetailPageLayout>
                    <StorePreview store={item} />
                    <StoreOverviewContainer>
                        <StyledRightContainer>
                            <BookmarkBox>
                                <Bookmark bookmarkId={bookmarkId} storeId={storeId} />
                                <p>저장하기</p>
                            </BookmarkBox>
                            <StoreMap store={item} />
                        </StyledRightContainer>
                        <StyledLeftContainer>
                            <div>
                                <StoreInsight store={item} />
                                <StoreMenues store={item} />
                                <ReviewDetail store={item} />
                                <StoreTip store={item} />
                            </div>
                            <StoreOverview store={item} />
                        </StyledLeftContainer>
                    </StoreOverviewContainer>
                </DetailPageLayout>
            )}
            {isLoading && <Loading />}
            {!isLoading && <Footer />}
        </>
    );
};

export default StoreDetailPage;

const DetailPageLayout = styled.div`
    width: 80%;
    max-width: 1000px;
    min-height: 100vh;
    margin: 30px auto 0px auto;
    display: flex;
    gap: 20px;
    flex-direction: column;
    justify-content: center;

    @media screen and (max-width: 500px) {
        width: 100%;
        margin-top: 0px;
    }
`;

const StoreOverviewContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 30px;

    @media screen and (max-width: 1024px) {
        flex-direction: column;
        margin: 0;
    }
`;

const StyledLeftContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 10px;
`;

const StyledRightContainer = styled.div`
    flex: 0.5;
    display: flex;
    flex-direction: column;
    gap: 20px;

    @media screen and (max-width: 1024px) {
        flex: 1;
        gap: 10px;
        padding: 10px;
    }
`;

const BookmarkBox = styled.div`
    width: 100%;
    height: 80px;
    margin-top: 60px;
    padding: 20px;
    padding-right: 30px;
    border-radius: 10px;
    border: 1px solid ${Grey};
    display: flex;
    gap: 20px;
    align-items: center;

    & > p {
        background-color: ${White};
        font-size: 16px;
        font-weight: 600;
    }

    @media screen and (max-width: 1024px) {
        margin-top: 0px;
        padding: 0px;
        padding-right: 0px;
        margin-left: 0px;
    }
`;

const ButtonBox = styled.div`
    position: sticky;
    width: 100%;
    height: 80px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    background-color: ${White};
    border-bottom: 1px solid ${LightGrey};
    padding: 10px;
    z-index: 10;
    top: 0;
    left: 0;

    @media screen and (max-width: 1024px) {
        flex: 1;
        height: 60px;
    }
`;
