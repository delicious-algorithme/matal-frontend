import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import styled from 'styled-components';
import { White } from '../../../color';

export const CustomNextArrow = ({ onClick }) => {
    return (
        <StyledNextArrowButton>
            <ArrowForwardIosRoundedIcon onClick={onClick} />
        </StyledNextArrowButton>
    );
};

export const CustomPrevArrow = ({ onClick }) => {
    return (
        <StyledPrevArrowButton>
            <ArrowBackIosNewRoundedIcon onClick={onClick} />
        </StyledPrevArrowButton>
    );
};

const StyledNextArrowButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: -40px;
    top: 50%;
    transform: translate(0, -50%);
    z-index: 10;
    width: 20px;
    height: 20px;
    background-color: ${White};
    border-radius: 50%;
    cursor: pointer;

    @media screen and (max-width: 500px) {
        display: none;
    }
`;

const StyledPrevArrowButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: -40px;
    top: 50%;
    transform: translate(0, -50%);
    z-index: 10;
    width: 20px;
    height: 20px;

    background-color: ${White};
    border-radius: 50%;
    cursor: pointer;

    @media screen and (max-width: 500px) {
        display: none;
    }
`;
