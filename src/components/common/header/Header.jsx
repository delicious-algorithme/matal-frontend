import styled from 'styled-components';
import Button from '../button/Button';
import { ReactComponent as Logo } from '../../../assets/Icon/Logo.svg';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const loginClickHandler = () => {
        navigate('/login');
    };

    const signUpClickHandler = () => {
        navigate('/signup');
    };

    const bookMarkClickHandler = () => {
        navigate('/bookmark');
    };

    const logoClickHandler = () => {
        navigate('/');
    };

    return (
        <HeaderLayout>
            <Logo onClick={logoClickHandler} />
            <ButtonContainer>
                <Button color="white" text="로그인" onClickHandler={loginClickHandler} />
                <Button color="orange" text="회원가입" onClickHandler={signUpClickHandler} />
                <Button color="green" text="내 가게" onClickHandler={bookMarkClickHandler} />
            </ButtonContainer>
        </HeaderLayout>
    );
};
export default Header;

const HeaderLayout = styled.header`
    display: flex;
    justify-content: space-between;
    & > svg {
        width: 250px;
        height: 120px;
        cursor: pointer;
    }
    align-items: center;
    width: 100%;
    padding: 10px;
    transition: all 0ms ease;
    @media screen and (max-width: 780px) {
        & > svg {
            width: 100px;
            height: 75px;
        }
        padding: 0px;
        padding-right: 10px;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    transition: all 0.5s ease;
    gap: 20px;
    @media screen and (max-width: 780px) {
        :nth-child(2) {
            display: none;
        }
    }
`;
