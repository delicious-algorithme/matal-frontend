import styled, { keyframes, css } from 'styled-components';
import { TopStoreCard } from '../storeCard';
import { useEffect, useState } from 'react';
import { Grey, Orange, White } from '../../color';
import trophyIcon from '../../assets/Icon/trophy.svg';
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
                <img src={trophyIcon} alt="trophy" />
                <h3>Top10 #푸짐한 양/ 친절한 서비스/ 신선한 재료</h3>
            </label>
            <p>AI 긍정키워드로 분석한 TOP 10</p>
            {!isLoading && topStores.length > 0 && (
                <AnimatedContainer isAnimating={isAnimating} animationDirection={animationDirection}>
                    {visibleStores.map((store, idx) => (
                        <div key={idx}>
                            <p style={{ fontSize: '24px', fontWeight: 'bold' }}> {next + idx - 2}</p>
                            <TopStoreCard
                                image={store.imageUrls}
                                address={store.address}
                                storeId={store.storeId}
                                alt="top-store"
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
                        <img
                            src="https://wnstn6945.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F499f229c-bff2-4c82-ae94-81c36fa59a9c%2Fd8a1db92-2da5-47df-9966-9ffe28d3a532%2FVector_(23).svg?table=block&id=a61d8fc9-8fe6-43f2-a5ec-32f88b2c8fc0&spaceId=499f229c-bff2-4c82-ae94-81c36fa59a9c&userId=&cache=v2"
                            alt="arrow"
                        />
                    </button>
                )}
                {next < topStores.length && (
                    <button onClick={loadMore}>
                        <img
                            src="https://wnstn6945.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F499f229c-bff2-4c82-ae94-81c36fa59a9c%2F684cbb88-9b5b-4a2f-b924-8888f64f801c%2FVector_(22).svg?table=block&id=1a31d9e7-0ba7-4dcc-9a5e-52491f94f140&spaceId=499f229c-bff2-4c82-ae94-81c36fa59a9c&userId=&cache=v2"
                            alt="arrow"
                        />
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

    & > div > p {
        margin-bottom: 20px;
        color: ${Orange};
    }
    @media screen and (max-width: 768px) {
        width: 100%;
        flex-direction: row;
    }

    @media screen and (max-width: 768px) {
        width: 100%;
        flex-direction: column;
    }
`;

const TopRecommendationsLayout = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    gap: 10px;

    & > label {
        text-align: center;
        display: flex;
        flex-direction: row;
        gap: 10px;
    }

    @media screen and (max-width: 780px) {
        width: 80%;
        align-items: center;
        justify-content: center;
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
