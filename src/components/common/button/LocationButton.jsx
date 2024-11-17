import styled from 'styled-components';
import { White, Orange, DarkGrey } from '../../../color';
import { ReactComponent as Path } from '../../../assets/Icon/detail/Path.svg';

const LocationButton = ({ pathClickHandler }) => {
    return (
        <StyledButton onClick={pathClickHandler}>
            <Path />
            길찾기
        </StyledButton>
    );
};

export default LocationButton;

const StyledButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${Orange};
    gap: 5px;
    width: 80px;
    height: 35px;
    font-size: 16px;
    font-weight: 600;
    border-radius: 10px;
    border: 1px solid ${Orange};
    background-color: ${White};

    & > svg {
        width: 17px;
    }
    cursor: pointer;
`;
