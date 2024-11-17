import { useState } from 'react';
import styled from 'styled-components';
import { Orange, White, LightGrey, DarkGrey, Grey } from '../../color';

const PopOver = ({ text, label }) => {
    const [isHovered, setIsHovered] = useState();

    return (
        <PopOverContainer onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <Button> ? </Button>
            {isHovered && (
                <PopoverText>
                    <Label>{label}</Label>
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

const Label = styled.label`
    font-weight: bold;
    color: ${DarkGrey};
`;

const Button = styled.button`
    width: 15px;
    height: 15px;
    border-radius: 100px;
    display: flex;
    background: ${White};
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
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background-color: ${LightGrey};
    z-index: 10;
    padding: 30px;
    margin: 50px;
    height: 70px;
    box-shadow: 2px 2px 2px 2px ${Grey};
    border-radius: 20px;
    border: 1px solid ${Grey};

    font-size: 14px;
`;
