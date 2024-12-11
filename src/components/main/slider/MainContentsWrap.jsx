import styled from 'styled-components';
import Slider from 'react-slick';
import sliderSettings from '../../common/slider/sliderSetting';
import StoreCardWrapper from './StoreCardWrap';

import { DarkGrey, Orange } from '../../../color';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const MainContentsWrap = ({ ranking, title, description, stores }) => {
    return (
        <MainContentsWrapLayout>
            <label>
                <h3>{title}</h3>
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
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 100px;

    & > label {
        text-align: center;
        display: flex;
        flex-direction: row;
        gap: 10px;
    }

    @media screen and (max-width: 780px) {
        width: 100%;
        margin-bottom: 10px;
        align-items: center;
        justify-content: center;
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
        margin-right: -10px;
    }

    & > div > p {
        margin-bottom: 20px;
        color: ${Orange};
    }

    @media screen and (max-width: 1024px) {
        margin: 0;
    }

    @media screen and (max-width: 768px) {
        width: 100%;
        gap: 20px;

        .slick-dots li button::before {
            display: none;
        }
    }
`;
