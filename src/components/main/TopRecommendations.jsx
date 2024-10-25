import styled, { keyframes, css } from 'styled-components';
import { ReactComponent as Trophy } from '../../assets/Icon/main/Trophy.svg';
import { ReactComponent as TopLeftArrow } from '../../assets/Icon/arrow/TopLeftArrow.svg';
import { ReactComponent as TopRightArrow } from '../../assets/Icon/arrow/TopRightArrow.svg';
import { TopStoreCard } from '../storeCard';
import { useEffect, useState } from 'react';
import { Grey, White } from '../../color';
import { getTopStores } from '../../apis/api/getTopStores';

const TopRecommendations = () => {
    const [topStores, setTopStores] = useState([]);
    const [visibleStores, setVisibleStores] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [next, setNext] = useState(3);
    const [isAnimating, setIsAnimating] = useState(false);
    const [animationDirection, setAnimationDirection] = useState('in');

    const fetchTopStores = async () => {
        setIsLoading(true);
        try {
            const response = await getTopStores();
            if (response.status === 200) {
                const newData = response.data.content;
                setTopStores(newData);
                setVisibleStores(newData.slice(0, 3));
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTopStores();
    }, []);

    const loadMore = () => {
        if (next < topStores.length) {
            const newVisibleStores = topStores.slice(next, next + 3);
            setVisibleStores(newVisibleStores);
            setNext((prevNext) => prevNext + 3);
            triggerAnimation('in');
        }
    };

    const loadPrev = () => {
        if (next > 3) {
            const newVisibleStores = topStores.slice(next - 6, next - 3);
            setVisibleStores(newVisibleStores);
            setNext((prevNext) => prevNext - 3);
            triggerAnimation('out');
        }
    };

    const triggerAnimation = (direction) => {
        setAnimationDirection(direction);
        setIsAnimating(true);
        setTimeout(() => {
            setIsAnimating(false);
        }, 1000);
    };

    return (
        <TopRecommendationsLayout>
            <label>
                <Trophy />
                <h3>Top10 #푸짐한 양/ 친절한 서비스/ 신선한 재료</h3>
            </label>
            <p>AI 긍정키워드로 분석한 TOP 10</p>
            {!isLoading && topStores.length > 0 && (
                <AnimatedContainer isAnimating={isAnimating} animationDirection={animationDirection}>
                    {visibleStores.map((store, idx) => (
                        <div key={idx}>
                            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{next + idx - 2}</p>
                            <TopStoreCard
                                image={store.imageUrls}
                                id={store.storeId}
                                positiveRatio={store.positiveRatio}
                                keyword={store.positiveKeywords}
                                name={store.name}
                            />
                        </div>
                    ))}
                </AnimatedContainer>
            )}
            <ButtonContainer>
                {next > 3 && (
                    <button onClick={loadPrev}>
                        <TopLeftArrow />
                    </button>
                )}
                {next < topStores.length && (
                    <button onClick={loadMore}>
                        <TopRightArrow />
                    </button>
                )}
            </ButtonContainer>
        </TopRecommendationsLayout>
    );
};

export default TopRecommendations;

const moveIn = keyframes`
    from {
        transform: translateX(-50%);
    }
    to {
        transform: translateX(0);
    }
`;

const moveOut = keyframes`
    from {
        transform: translateX(50%);
    }
    to {
        transform: translateX(0);
    }
`;

const AnimatedContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 30px;
    ${({ isAnimating, animationDirection }) =>
        isAnimating &&
        css`
            animation: ${animationDirection === 'in' ? moveIn : moveOut} 1s forwards;
        `}
    @media screen and (max-width: 768px) {
        width: 60%;
        flex-direction: column;
    }
    @media screen and (max-width: 576px) {
        width: 80%;
        flex-direction: column;
    }
`;

const TopRecommendationsLayout = styled.div`
    width: 80%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    & > label {
        display: flex;
        flex-direction: row;
        gap: 10px;
    }
    @media screen and (max-width: 780px) {
        align-items: center;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 30px;

    & > button {
        width: 40px;
        height: 40px;
        background-color: ${White};
        border-radius: 100%;
        box-shadow: 2px 2px 2px ${Grey};
    }
`;
