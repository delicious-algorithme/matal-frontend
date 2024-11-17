import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../../store';
import Button from '../button/Button';
import { ReactComponent as Logo } from '../../../assets/Icon/Logo.svg';
import { logout } from '../../../apis/api/login';
import Swal from 'sweetalert2';
import { LightGrey, White } from '../../../color';

const Header = () => {
    const { isLoggedIn, setLogout } = useLogin();
    const navigate = useNavigate();

    const handleClick = {
        login: () => navigate('/login'),
        signUp: () => navigate('/signup'),
        bookmark: () => navigate('/bookmark'),
        logo: () => navigate('/'),
    };

    const logoutHandler = async () => {
        const response = await logout();
        if (response.status === 200) {
            Swal.fire({
                icon: 'success',
                title: '로그아웃 성공',
                text: '로그아웃 성공',
            });
            setLogout();
            navigate('/');
        }
    };

    const buttons = [
        { text: '로그인', color: 'white', visible: !isLoggedIn, onClick: handleClick.login },
        { text: '회원가입', color: 'orange', visible: !isLoggedIn, onClick: handleClick.signUp },
        { text: '내 가게', color: 'green', visible: isLoggedIn, onClick: handleClick.bookmark },
        { text: '로그아웃', color: 'white', visible: isLoggedIn, onClick: logoutHandler },
    ];

    return (
        <HeaderLayout>
            <Logo onClick={handleClick.logo} />
            <ButtonContainer>
                {buttons.map((button, index) => (
                    <Button
                        key={index}
                        color={button.color}
                        text={button.text}
                        onClickHandler={button.onClick}
                        visible={button.visible}
                    />
                ))}
            </ButtonContainer>
        </HeaderLayout>
    );
};
export default Header;

const HeaderLayout = styled.header`
    display: flex;
    justify-content: space-between;
    padding-right: 100px;
    background-color: ${White};
    padding-left: 50px;
    & > svg {
        width: 250px;
        height: 100px;
        cursor: pointer;
    }
    align-items: center;
    width: 100%;
    transition: all 0ms ease;
    @media screen and (max-width: 768px) {
        & > svg {
            width: 100px;
            height: 75px;
        }
        padding: 0px;
        padding-right: 10px;
    }
    border-bottom: 1px solid ${LightGrey};
    margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
    display: flex;
    transition: all 0.5s ease;
    gap: 20px;
`;
