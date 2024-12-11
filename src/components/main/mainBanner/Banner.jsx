import styled from 'styled-components';
import banner from '../../../assets/banner.webp';
import { keyframes } from 'styled-components';
import { White } from '../../../color';

const Banner = () => {
    return (
        <BannerWrap>
            <BannerText>
                <p>맛있는 알고리즘이</p>
                <p> 분석한 리뷰로</p>
                <p> 당신만의 맛집을 찾아보세요</p>
            </BannerText>
        </BannerWrap>
    );
};

export default Banner;

const moveInText = keyframes`
    0% {
        transform: translateY(100%);
        opacity: 0;
    }

    100% {
        transform: translateY(0);
        opacity: 1;
    }
`;

const BannerWrap = styled.div`
    width: 80%;
    border-radius: 20px;
    margin-top: 10px;
    height: auto;
    display: flex;
    background: url(${banner});
    background-repeat: no-repeat;
    justify-content: center;
    align-items: center;
    text-align: center;
    align-items: center;
    background-position: center;

    @media screen and (max-width: 500px) {
        width: 100%;
        border-radius: 0px;
        margin-top: 0px;
    }
`;

const BannerText = styled.div`
    margin-top: 0;
    width: 100%;
    height: 374px;
    display: flex;
    gap: 5px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    font-size: 24px;
    color: ${White};
    font-weight: 700;

    & > p {
        animation: ${moveInText} 1.5s ease-out;
    }

    & > div {
        opacity: 0;
        animation-delay: 2s;
        animation: ${moveInText} 1.5s forwards;
    }

    @media screen and (max-width: 1024px) {
        font-size: 2.5vw;
        height: 300px;
    }

    @media screen and (max-width: 768px) {
        font-size: 2vw;
        height: 180px;
    }

    @media screen and (max-width: 500px) {
        display: none;
    }
`;
