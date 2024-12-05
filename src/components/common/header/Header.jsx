import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../../store';
import Button from '../button/Button';
import { logout } from '../../../apis/api/login';
import Swal from 'sweetalert2';
import { LightGrey } from '../../../color';

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
            localStorage.clear();
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
            <img
                src="https://wnstn6945.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F499f229c-bff2-4c82-ae94-81c36fa59a9c%2Fd1c8f3b8-5fcb-4289-a42f-fef7a8141c3d%2FGroup_1000002057.svg?table=block&id=667a6150-184b-4818-8d06-598a9cd04429&spaceId=499f229c-bff2-4c82-ae94-81c36fa59a9c&userId=&cache=v2"
                onClick={handleClick.logo}
                alt="logo"
            />
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
    top: 0;
    z-index: 10;
    position: sticky;
    background-color: rgba(255, 255, 255, 0.8);
    padding-left: 50px;

    & > img {
        margin-left: 20px;
        width: 120px;
        height: 80px;
        cursor: pointer;
        & > rect {
            fill: none;
        }
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
`;

const ButtonContainer = styled.div`
    display: flex;
    transition: all 0.5s ease;
    gap: 20px;
`;
