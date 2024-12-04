import styled from 'styled-components';
import { White, Orange } from '../../../color';

const LocationButton = ({ pathClickHandler }) => {
    return (
        <StyledButton onClick={pathClickHandler}>
            <img
                src="https://wnstn6945.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F499f229c-bff2-4c82-ae94-81c36fa59a9c%2F0dfda735-36f9-4e86-b520-ff0ce921103f%2FVector_(24).svg?table=block&id=38d2a050-cbd5-41f3-81b2-20331e57530f&spaceId=499f229c-bff2-4c82-ae94-81c36fa59a9c&userId=&cache=v2"
                alt="path"
            />
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
    width: 100px;
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
