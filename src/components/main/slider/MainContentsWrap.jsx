import styled from 'styled-components';
import Slider from 'react-slick';
import sliderSettings from '../../common/slider/sliderSetting';
import StoreCardWrapper from './StoreCardWrap';
import trophyIcon from '../../../assets/Icon/trophy.svg';

import { DarkGrey, Orange } from '../../../color';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const MainContentsWrap = ({ ranking, title, description, stores }) => {
    return (
        <MainContentsWrapLayout>
            <label>
                <h3>{title}</h3>
                <img src={trophyIcon} alt="trophy-icon" width="16px" />
            </label>
            <p>{description}</p>
            <SlideContainer>
                <Slider {...sliderSettings}>
                    {stores.map((store, idx) => (
                        <StoreCardWrapper ranking={ranking} key={store.storeId} store={store} index={idx} />
                    ))}
                </Slider>
            </SlideContainer>
        </MainContentsWrapLayout>
    );
};

export default MainContentsWrap;

const MainContentsWrapLayout = styled.div`
    width: 100%;
    height: 400px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 10px;

    & > label {
        text-align: center;
        display: flex;
        flex-direction: row;
        gap: 10px;
    }

    @media screen and (max-width: 780px) {
        justify-content: center;

        & > label > h3 {
            align-items: flex-start;
            margin-left: 10px;
            font-size: 16px;
        }

        & > p {
            display: none;
        }
    }
`;

const SlideContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;

    & > .slick-slider {
        width: 100%;
    }

    .slick-slide {
        display: flex;
        padding-right: 10px;
    }

    & .slick-dots {
        bottom: -50px;
    }

    .slick-dots li {
        margin: 0 5px;
    }

    .slick-dots li button::before {
        font-size: 0;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: ${DarkGrey};
        border: none;
    }

    & .slick-list {
        overflow: hidden;
    }

    & > div > p {
        margin-bottom: 20px;
        color: ${Orange};
    }

    @media screen and (max-width: 1024px) {
        margin: 0;
    }

    @media screen and (max-width: 500px) {
        width: 100%;
        gap: 5px;
        display: flex;
        justify-content: center;
        align-items: center;

        /* 라이브러리 기본 스타일을 덮어쓰기 위해 사용 */
        .slick-slide {
            width: 210px !important;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .slick-dots li button::before {
            font-size: 0;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: ${DarkGrey};
            border: none;
        }
    }
`;
