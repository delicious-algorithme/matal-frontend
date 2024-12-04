import styled from 'styled-components';
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
            <img
                src="https://wnstn6945.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F499f229c-bff2-4c82-ae94-81c36fa59a9c%2Fd1c8f3b8-5fcb-4289-a42f-fef7a8141c3d%2FGroup_1000002057.svg?table=block&id=667a6150-184b-4818-8d06-598a9cd04429&spaceId=499f229c-bff2-4c82-ae94-81c36fa59a9c&userId=&cache=v2"
                alt="logo"
            />
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
