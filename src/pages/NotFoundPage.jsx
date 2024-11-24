import styled from 'styled-components';
import { ReactComponent as Logo } from '../assets/Icon/Logo.svg';
import { useNavigate } from 'react-router-dom';
import { DarkGreen } from '../color';
import { Button } from '../components/common';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <NotFoundPageLayout>
            <NotFoundMessageWrapper>
                <p>404</p>아무것도 없네요!
            </NotFoundMessageWrapper>
            <Button
                visible="true"
                onClickHandler={() => {
                    navigate('/');
                }}
                text="홈으로"
                color="green"
            />
            <Logo />
        </NotFoundPageLayout>
    );
};

export default NotFoundPage;

const NotFoundPageLayout = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    flex-direction: column;
    width: 100%;

    & > svg {
        width: 200px;
        height: 200px;
    }
`;

const NotFoundMessageWrapper = styled.div`
    padding-left: 1rem;
    padding-right: 1rem;
    white-space: pre;
    text-align: center;
    line-height: 1.5;
    font-size: 24px;
    font-weight: 700;
    color: ${DarkGreen};
    margin-top: 0px;

    & > p {
        font-size: 40px;
    }
`;
