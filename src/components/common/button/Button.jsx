import styled from 'styled-components';
import { Orange, White, DarkGreen } from '../../../color';

const Button = ({ color, text, visible, onClickHandler }) => {
    return (
        <StyledButton color={color} onClick={onClickHandler} text={text} visible={visible}>
            {text}
        </StyledButton>
    );
};

export default Button;

const StyledButton = styled.button`
    width: ${(props) => {
        return ['로그인하기', '가입하기', '로그인 하러 가기'].includes(props.text) ? '100%' : 'fit-content';
    }};
    height: 48px;
    padding-left: 20px;
    padding-right: 20px;
    text-align: center;
    border-radius: ${(props) => {
        return ['로그인하기', '가입하기', '로그인 하러 가기'].includes(props.text) ? '10px' : '20px';
    }};
    text-align: center;
    transition: all 0.5ms ease;
    font-size: 16px;
    font-weight: 700;
    display: ${(props) => (props.visible ? 'block' : 'none')};

    cursor: pointer;

    &:hover {
        background-color: ${Orange};
        color: ${White};
    }

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
                return DarkGreen;
            case 'green':
                return DarkGreen;
            default:
                return White;
        }
    }};

    @media screen and (max-width: 1024px) {
        font-size: 12px;
        height: 35px;
        padding-left: 20px;
        padding-right: 20px;
    }

    @media screen and (max-width: 768px) {
        font-size: 12px;
        height: 35px;
        padding-left: 10px;
        padding-right: 10px;
        &:hover {
            font-size: 13px;
        }
    }
`;
