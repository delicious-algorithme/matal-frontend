import styled from 'styled-components';
import { useStoreDetail } from '../store';
import { useState, useEffect } from 'react';
import { StorePreview, StoreMap, StoreInsight, StoreOverview, ReviewDetail, StoreTip } from '../components/storeDetail';
import { Grey, LightGrey, White } from '../color';
import { Footer } from '../components/common';
import { useNavigate, useParams } from 'react-router-dom';
import { getStoreDetail } from '../apis/api/getStoreDetail';
import { Button } from '../components/common';
import { ReactComponent as BookmarkIcon } from '../assets/Icon/detail/Bookmark.svg';

const StoreDetailPage = () => {
    const [item, setItem] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const storeId = id;
    const { setStoreDetail } = useStoreDetail();

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
            console.log(newData);
            setStoreDetail(newData);
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (storeId) {
            fetchStoreDetail(storeId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storeId]);

    const buttonClickHandler = () => {
        navigate('/webmap');
    };

    const { toggleStoreDetailPage, isStoreDetailPage } = useStoreDetail();

    if (!isStoreDetailPage) {
        toggleStoreDetailPage();
    }

    return (
        <>
            <ButtonBox>
                <Button onClickHandler={buttonClickHandler} text="뒤로 가기" color="orange" visible={true} />
                <h4>{item.name}</h4>
            </ButtonBox>
            {!isLoading && (
                <DetailPageLayout>
                    <StorePreview store={item} />
                    <StoreOverviewContainer>
                        <StyledLeftContainer>
                            <div>
                                <StoreInsight store={item} />
                                <ReviewDetail store={item} />
                                <StoreTip store={item} />
                            </div>
                            <StoreOverview store={item} />
                        </StyledLeftContainer>
                        <StyledRightContainer>
                            <BookmarkBox>
                                <BookmarkIcon />
                                <button>저장하기</button>
                            </BookmarkBox>
                            <StoreMap store={item} />
                        </StyledRightContainer>
                    </StoreOverviewContainer>
                </DetailPageLayout>
            )}
            {isLoading && <p>로딩중,,</p>}
            <Footer />
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

    @media screen and (max-width: 1024px) {
        width: 100%;
    }
`;

const StoreOverviewContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 30px;

    @media screen and (max-width: 1024px) {
        flex-direction: column;
        margin: 10px 10px;
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
    }
`;

const BookmarkBox = styled.div`
    width: 100%;
    height: 80px;
    margin-top: 50px;
    padding: 20px;
    border: 1px solid ${Grey};
    border-radius: 10px;

    display: flex;
    gap: 20px;
    align-items: center;

    & > button {
        background-color: ${White};
        font-size: 18px;
        font-weight: 600;

        &:hover {
            cursor: pointer;
        }
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
