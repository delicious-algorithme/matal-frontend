import styled from 'styled-components';
import { Grey, Orange } from '../../color';
import PopOver from './PopOver';
import { Keyword } from '../common';
import PieChart from './PieChart';

const ReviewDetail = ({ store }) => {
    if (!store || Object.keys(store).length === 0) {
        return <p>로딩 중...</p>;
    }

    return (
        <>
            <ContentBox>
                <TitleBox>
                    <h4>긍정/부정/중립 리뷰</h4>
                    <PopOver
                        label="긍정/부정/중립 리뷰란?"
                        text={`AI가 리뷰의 긍정적인 비율 분석하여 제공합니다. 이 식당의 긍정적인 리뷰의 비율은 ${store.positiveRatio}%입니다.`}
                    />
                </TitleBox>
                <PieChart
                    positiveRatio={store.positiveRatio}
                    neutralRatio={store.neutralRatio}
                    negativeRatio={store.negativeRatio}
                />
            </ContentBox>
            <KeywordContentBox>
                <TitleBox>
                    <h4>긍정 키워드</h4>
                </TitleBox>
                <Keyword keyword={store.positiveKeywords} type="positive" />
            </KeywordContentBox>
            <KeywordContentBox>
                <TitleBox>
                    <h4>부정 키워드</h4>
                </TitleBox>
                <Keyword keyword={store.negativeKeywords} type="negative" />
            </KeywordContentBox>
            <ContentBox>
                <TitleBox>
                    <h4>추천 메뉴</h4>
                    <PopOver label="추천메뉴란?" text="리뷰를 분석해 AI가 메뉴를 추천해줍니다." />
                </TitleBox>
                <p>{store.recommendMenu}</p>
            </ContentBox>
        </>
    );
};

export default ReviewDetail;

const ContentBox = styled.div`
    width: 100%;
    margin-top: 20px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    border: 1px solid ${Grey};
    border-radius: 10px;
    gap: 10px;

    @media screen and (max-width: 1024px) {
        border-bottom: 1px solid ${Grey};
        border-radius: none;
        font-size: 14px;
    }
`;

const TitleBox = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    width: 200px;

    & > h3 {
        color: ${Orange};
    }
`;

const KeywordContentBox = styled.div`
    width: 100%;
    margin-top: 20px;
    padding: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    border: 1px solid ${Grey};
    border-radius: 10px;

    @media screen and (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;
