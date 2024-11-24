import { ReactComponent as Spinner } from '../../../assets/Icon/Spinner.svg';
import styled from 'styled-components';

const Loading = () => {
    return (
        <LoadingContainer>
            <Spinner />
        </LoadingContainer>
    );
};

export default Loading;

const LoadingContainer = styled.div`
    display: flex;
    height: 100vh;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
