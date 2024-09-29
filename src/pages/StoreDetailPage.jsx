import styled from 'styled-components';
import { ReactComponent as Logo } from '../assets/Icon/Logo.svg';
import { ReactComponent as Star } from '../assets/Icon/Star.svg';
import { ReactComponent as Insight } from '../assets/Icon/Insight.svg';
import { ReactComponent as SoloDining } from '../assets/Icon/SoloDining.svg';
import { ReactComponent as Parking } from '../assets/Icon/Parking.svg';
import { ReactComponent as Dog } from '../assets/Icon/Dog.svg';
import { ReactComponent as Clock } from '../assets/Icon/Clock.svg';
import { ReactComponent as Recommended } from '../assets/Icon/Recommended.svg';
import { ReactComponent as ParkingTip } from '../assets/Icon/PakingTip.svg';
import { ReactComponent as WaitingTip } from '../assets/Icon/WaitingTip.svg';
import { ReactComponent as Path } from '../assets/Icon/Path.svg';
import { DartkGrey, LightGrey, Grey, Orange, White } from '../color';
import { MyMap } from '../components/common';
import { useStoreDetail } from '../store';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom/dist';
import { getStoreDetail } from '../apis/api/getStoreDetail';

const StoreDetailPage = () => {
    const [item, setItem] = useState('');
    const { id } = useParams();
    const storeId = id;

    const { setStoreDetail } = useStoreDetail();
    const [isLoading, setIsLoading] = useState();
    const { toggleStoreDetailPage, isStoreDetailPage } = useStoreDetail();

    if (!isStoreDetailPage) {
        toggleStoreDetailPage();
    }

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
            fetchStoreDetail(storeId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storeId]);

    const navigate = useNavigate();
    const logoClickHandler = () => {
        navigate('/');
    };
    const buttonClickHandler = () => {
        navigate('/webmap');
    };

    const pathClickHandler = () => {
        window.location.href = item.storeLink;
    };
    const piechart = [item.neutralRatio, item.negativeRatio + item.neutralRatio, item.neutralRatio];
    return (
        !isLoading && (
            <StoreDetailLayout>
                <Header>
                    <Logo onClick={logoClickHandler} />
                    <button onClick={buttonClickHandler}>식당 찾아보기</button>
                </Header>
                <ContentsContainer>
                    <ImageAndOverView>
                        <div>
                            <img src={item.imageUrl} alt={item.name} />
                            <button onClick={pathClickHandler}>
                                <Path />
                                경로
                            </button>
                        </div>
                        <div>
                            <h1>{item.name}</h1>
                            <div>
                                <p>별점</p>
                                <Star />
                                <span>{item.rating}</span>
                            </div>
                            <p>리뷰 {item.reviewsCount}</p>
                            <h4>{item.category}</h4>
                        </div>
                    </ImageAndOverView>
                    <AIReviewInsightBox>
                        <div>
                            <TitleBox>
                                <div>
                                    <h2>AI리뷰 인사이트</h2>
                                    <Insight />
                                </div>
                                <p>
                                    {' '}
                                    AI가 다수의 고객 리뷰를 정밀히 분석하여 숨겨진 인사이트를 찾아주는 서비스 입니다.
                                </p>
                            </TitleBox>
                            <BasicInfoBox>
                                <div>
                                    <SoloDining />
                                    <span>혼밥 불가능</span>
                                </div>
                                <div>
                                    <Parking />
                                    <span>주차 불가능</span>
                                </div>
                                <div>
                                    <Dog />
                                    <div>애완견 동반 불가능</div>
                                </div>
                                <div>
                                    <Clock />
                                    <div>웨이팅 있는 맛집</div>
                                </div>
                            </BasicInfoBox>
                        </div>
                        <ReviewSummaryBox>
                            <TitleBox>
                                <h2>AI리뷰 한 줄 요약</h2>
                            </TitleBox>
                            <Content>
                                <p>{item.reviewSummary}</p>
                            </Content>
                        </ReviewSummaryBox>
                        <TitleBox>
                            <h2>AI 긍정/부정/중립 리뷰 비율</h2>
                            <p>AI가 분석한 이 식당의 긍정적인 리뷰의 비율은 {item.positiveRatio}%입니다.</p>
                        </TitleBox>
                        <PositiveRatioBox>
                            <PieChartBox>
                                <PieChart piechart={piechart} />
                                <p>
                                    긍정 {item.positiveRatio}% 부정 {item.negativeRatio}% 중립 {item.neutralRatio}%
                                </p>
                                <div>
                                    <div />
                                    <span>:긍정</span>
                                    <div />
                                    <span>:부정</span>
                                    <div />
                                    <span>:중립</span>
                                </div>
                            </PieChartBox>
                            <div>
                                <h3>
                                    AI 리뷰 <span>긍정</span>키워드
                                </h3>
                                <p>AI가 분석한 이 식당 리뷰의 긍정 키워드</p>
                                <h4>{item.positiveKeywords}</h4>
                                <h3>
                                    AI 리뷰 <span>부정</span>키워드
                                </h3>
                                <p>AI가 분석한 이 식당 리뷰의 부정 키워드</p>
                                <h4>{item.negativeKeywords}</h4>
                            </div>
                        </PositiveRatioBox>
                        <RecommendBox>
                            <h2>AI 추천 메뉴</h2>
                            <p>리뷰를 분석해 AI가 메뉴를 추천해줍니다.</p>
                            <div>
                                <Recommended />
                                <p>{item.recommendMenu}</p>
                            </div>
                        </RecommendBox>
                        <TipBox>
                            <h2>AI TIP</h2>
                            <div>
                                <div>
                                    <ParkingTip />
                                    <h3>주차 팁</h3>
                                    <p>{item.parkingTip}</p>
                                </div>
                                <div>
                                    <WaitingTip />
                                    <h3>웨이팅 꿀팁</h3>
                                    <p>{item.waitingTip}</p>
                                </div>
                            </div>
                        </TipBox>
                    </AIReviewInsightBox>
                    <OverViewContainer>
                        <div>
                            <h2>식당 정보</h2>
                        </div>
                        <OverViewAndMenuBox>
                            <div>
                                <h3>개요</h3>
                                <div>
                                    <span>전화번호</span>
                                    <p>{item.phone}</p>
                                </div>
                                <div>
                                    <span>주소</span>
                                    <p>{item.address}</p>
                                </div>
                                <div>
                                    <span>영업시간</span>
                                    {Array.isArray(item.businessHours) &&
                                        item.businessHours.map((item, idx) => <div key={idx}>{item}</div>)}
                                </div>
                            </div>
                            <div>
                                <h3>메뉴</h3>
                                <p>{item.menuAndPrice}</p>
                            </div>
                        </OverViewAndMenuBox>
                    </OverViewContainer>
                    <LocationContainer>
                        <div>
                            <h2>위치</h2>
                            <p>{item.address}</p>
                        </div>
                        <MapBox>
                            <MyMap />
                        </MapBox>
                    </LocationContainer>
                </ContentsContainer>
            </StoreDetailLayout>
        )
    );
};

export default StoreDetailPage;

const StoreDetailLayout = styled.div`
    display: flex;
    margin: 0px;
    width: 100%;
    height: auto;
    font-size: 16px;
    flex-direction: column;
    align-items: center;
`;
const Header = styled.div`
    display: flex;
    padding-left: 200px;
    padding-right: 200px;
    justify-content: space-between;
    width: 100%;
    height: 125px;
    align-items: center;

    background-color: ${White};
    border-bottom: 2px solid ${Grey};
    & > svg {
        cursor: pointer;
    }
    & > button {
        width: fit-content;
        text-align: center;
        padding: 15px;
        color: ${Orange};
        background: ${LightGrey};
        font-weight: bold;
        border-radius: 10px;
        cursor: pointer;
        &:hover {
            background: ${Orange};
            color: ${White};
        }
    }
`;

const ContentsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const ImageAndOverView = styled.div`
    border-bottom: 1px solid ${Grey};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 30px;
    padding-bottom: 20px;
    :first-child {
        display: flex;
        align-items: flex-start;
    }
    & > div {
        margin-top: 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 30px;
        & > img {
            width: 500px;
            height: 300px;
            border-radius: 10px;
        }
        & > button {
            display: flex;
            align-items: center;
            justify-content: center;
            color: ${Orange};
            gap: 10px;
            width: 90px;
            height: 40px;
            font-size: 16px;
            border-radius: 20px;
            border: 1px solid ${Orange};
            background-color: ${White};
            & > svg {
                width: 15px;
            }
            cursor: pointer;
        }
        & > h1 {
            color: ${Orange};
        }
        & > div {
            display: flex;
            flex-direction: row;
            align-items: center;
        }
        & > h4 {
            color: ${Orange};
        }
    }
`;

const AIReviewInsightBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-bottom: 30px;
    border-bottom: 1px solid ${Grey};
`;
const TitleBox = styled.div`
    margin-top: 20px;
    & > div {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
        & > h2 {
            color: ${Orange};
        }
    }
    & > h2 {
        color: ${Orange};
    }
    & > p {
        margin-top: 10px;
        color: ${DartkGrey};
        font-size: 13px;
    }
`;

const BasicInfoBox = styled.div`
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    gap: 20px;
    & > div {
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: center;
        & > span {
            width: 80px;
            font-weight: bold;
            display: flex;
        }
        & > div {
            width: 80px;
            display: flex;
            align-items: center;
            font-weight: bold;
            justify-content: center;
            text-align: center;
        }
    }
`;

const ReviewSummaryBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 50px;
`;

const Content = styled.div`
    max-width: 700px;
    height: 150px;
    border: 1px solid ${Grey};
    color: ${DartkGrey};
    border-radius: 20px;
    display: flex;
    align-items: center;
    padding: 20px;
    background-color: ${White};
    box-shadow: 2px 2px 2px ${Grey};
    line-height: 2;
`;

const PositiveRatioBox = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: center;
    & > div {
        display: flex;
        flex-direction: column;
        gap: 20px;
        & > h3 > span {
            color: ${Orange};
        }
        & > p {
            font-size: 13px;
            color: ${DartkGrey};
        }
        & > h4 {
            color: ${Orange};
        }
    }
`;
const PieChartBox = styled.div`
    box-shadow: 2px 2px 2px ${Grey};
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    gap: 20px;
    & > div {
        color: ${DartkGrey};
        display: flex;
        flex-direction: row;
        gap: 10px;
        :nth-child(2n + 1) {
            width: 35px;
            height: 20px;
        }
        :first-child {
            background-color: ${Orange};
        }
        :nth-child(3) {
            background-color: #ff9a62;
        }
        :nth-child(5) {
            background-color: #fff1e1;
        }
    }
    margin-bottom: 30px;
`;

const PieChart = styled.div`
    display: inline-block;
    position: relative;
    width: 200px;
    height: 200px;
    background: ${(props) => `conic-gradient(
    #ff9a62 0% ${props.piechart[0]}%, 
    #fff1e1 ${props.piechart[0]}% ${props.piechart[1]}%, 
    ${Orange} ${props.piechart[2]}% 100%
    )`};
    border-radius: 50%;
`;
const RecommendBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    & > h2 {
        color: ${Orange};
    }
    & > p {
        color: ${DartkGrey};
        font-size: 13px;
    }
    & > div {
        display: flex;
        flex-direction: row;
        gap: 20px;
    }
    margin-bottom: 30px;
`;
const TipBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    & > h2 {
        color: ${Orange};
    }
    & > div {
        display: flex;
        flex-direction: row;
        gap: 30px;
        & > div {
            min-width: 200px;
            height: 200px;
            display: flex;
            gap: 10px;
            border-radius: 20px;
            border: 1px solid ${Orange};
            flex-direction: column;
            justify-content: center;
            padding: 20px;
            box-shadow: 2px 2px 2px ${Grey};
        }
    }
`;
const OverViewContainer = styled.div`
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    & > div > h2 {
        color: ${Orange};
    }
    & > div {
        display: flex;
        gap: 20px;
    }
    & > div > div > div {
        display: flex;
        flex-direction: column;
        gap: 10px;
        & > span {
            color: ${DartkGrey};
        }
    }
    padding-bottom: 30px;
    border-bottom: 1px solid ${Grey};
`;
const OverViewAndMenuBox = styled.div`
    display: flex;
    flex-direction: row;
    & > div {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
`;
const LocationContainer = styled.div`
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    & > div {
        display: flex;
        flex-direction: row;
        gap: 20px;
        & > h2 {
            color: ${Orange};
        }
        & > p {
            font-weight: 600;
        }
    }
    padding-bottom: 30px;
`;

const MapBox = styled.div`
    border-radius: 20px;
    height: 500px;
    & > div {
        border-radius: 20px;
    }
`;
