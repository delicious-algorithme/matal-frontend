import { CustomNextArrow, CustomPrevArrow } from './CustomArrow';

const sliderSettings = {
    centerMode: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrow: false,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    initialSlide: 0,
    responsive: [
        {
            breakpoint: 1500,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                dots: true,
            },
        },
        {
            breakpoint: 768,
            settings: {
                centerMode: false,
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 0,
                infinite: false,
                dots: true,
            },
        },

        {
            breakpoint: 420,
            settings: {
                centerMode: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 0,
                infinite: false,
                dots: true,
            },
        },
    ],
};

export default sliderSettings;
