import styled from 'styled-components';
import { Orange, White, DarkGreen } from '../../../color';

const Button = ({ color, text, onClickHandler }) => {
    return (
        <StyledButton color={color} onClick={onClickHandler}>
            {text}
        </StyledButton>
    );
};

export default Button;
const StyledButton = styled.button`
    width: fit-content;
    height: 48px;
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 20px;
    text-align: center;

    font-size: 16px;
    font-weight: 700;

    cursor: pointer;

    color: ${(props) => {
        switch (props.color) {
            case 'orange':
                return White;
            case 'green':
                return White;
            default:
                return Orange;
        }
    }};

    background-color: ${(props) => {
        switch (props.color) {
            case 'orange':
                return Orange;
            case 'green':
                return DarkGreen;
            default:
                return White;
        }
    }};
`;
