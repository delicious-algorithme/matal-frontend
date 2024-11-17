import { useState } from 'react';
import styled from 'styled-components';
import { Orange, Grey, White } from '../../color';

const PopOver = ({ text }) => {
    const [isHovered, setIsHovered] = useState();

    return (
        <PopOverContainer onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <Button> ? </Button>
            {isHovered && (
                <PopoverText>
                    <p>{text}</p>
                </PopoverText>
            )}
        </PopOverContainer>
    );
};

export default PopOver;

const PopOverContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;
`;

const Button = styled.div`
    width: 15px;
    height: 15px;
    border-radius: 100px;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    border: 1px solid ${Orange};
    color: ${Orange};
    font-size: 10px;
    font-weight: 600;
`;

const PopoverText = styled.div`
    width: fit-content;
    min-width: 400px;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${White};
    z-index: 10;
    padding: 30px;
    margin: 50px;
    height: 70px;
    box-shadow: 2px 2px 2px 2px ${Grey};
    border-radius: 20px;

    font-size: 13px;
`;
