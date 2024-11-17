import styled from 'styled-components';
import { DarkGrey } from '../../color';

const StoreInfoCard = ({ icon, text, iconColor }) => {
    return (
        <StoreInfoCardBox>
            <IconBox iconColor={iconColor}> {icon}</IconBox>
            <p>{text}</p>
        </StoreInfoCardBox>
    );
};

export default StoreInfoCard;

const StoreInfoCardBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100px;
    gap: 5px;
    height: 100px;

    & > p {
        font-weight: 600;
        font-size: 14px;
        font-weight: bold;
    }
`;

const IconBox = styled.div`
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;

    & > svg {
        width: 100%;
        height: 100%;
        color: ${DarkGrey};
    }
`;
