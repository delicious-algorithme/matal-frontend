import { DarkGrey, Orange } from '../../color';
import styled from 'styled-components';

const PieChart = ({ positiveRatio, neutralRatio, negativeRatio }) => {
    const total = positiveRatio + neutralRatio + negativeRatio;

    const positive = (positiveRatio / total) * 100;
    const neutral = (neutralRatio / total) * 100;
    const negative = (negativeRatio / total) * 100;

    const piechart = [neutral, neutral + negative, 100];
    return (
        <PieChartBox>
            <PieChartStyle piechart={piechart} />
            <p>
                긍정 {positive.toFixed(1)}% | 중립 {neutral.toFixed(1)}% | 부정 {negative.toFixed(1)}%
            </p>
            <Legend>
                <LegendItem color={Orange}>
                    <span />
                    긍정
                </LegendItem>
                <LegendItem color="#fff1e1">
                    <span />
                    중립
                </LegendItem>
                <LegendItem color="#ff9a62">
                    <span />
                    부정
                </LegendItem>
            </Legend>
        </PieChartBox>
    );
};

export default PieChart;

const PieChartBox = styled.div`
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 20px;

    & > p {
        font-size: 14px;
        color: ${DarkGrey};
        font-weight: 600;
    }
    border-radius: 20px;
`;

const Legend = styled.div`
    display: flex;
    gap: 20px;
`;

const LegendItem = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    font-weight: 500;
    color: ${DarkGrey};

    & > span {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: ${(props) => props.color};
    }
`;

const PieChartStyle = styled.div`
    display: inline-block;
    position: relative;
    width: 120px;
    height: 120px;
    background: ${(props) => `conic-gradient(
        #fff1e1 0% ${props.piechart[0]}%, 
        #ff9a62 ${props.piechart[0]}% ${props.piechart[0] + props.piechart[1]}%, 
        ${Orange} ${props.piechart[0] + props.piechart[1]}% 100%
    )`};
    border-radius: 50%;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;
