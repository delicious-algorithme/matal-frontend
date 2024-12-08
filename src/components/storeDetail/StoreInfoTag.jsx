import styled from 'styled-components';
import { LightGrey, White } from '../../color';

const StoreInfoTag = ({ text }) => {
    return (
        <StoreInfoTagBox>
            <p>{text}</p>
        </StoreInfoTagBox>
    );
};

export default StoreInfoTag;

const StoreInfoTagBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: fit-content;
    padding: 15px;
    height: 30px;
    border-radius: 10px;
    color: #333333;
    border: 1px solid ${White};
    background: ${LightGrey};
    & > p {
        font-weight: 600;
        font-size: 14px;
    }
`;
