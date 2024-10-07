import styled from 'styled-components';
import { DarkGrey, LightGrey } from '../../../color';

const Footer = () => {
    return (
        <FooterLayout>
            <div>
                <p>
                    <span>MataI c </span>2024 All Right Reserved
                </p>
                <p>맛알고리즘은 AI가 다수의 고객 리뷰를 정밀히 분석하여 숨겨진 인사이트를 찾아주는 서비스입니다.</p>
                <p>
                    <span>Email :</span> gmail@gmail.com
                </p>
            </div>
        </FooterLayout>
    );
};

export default Footer;

const FooterLayout = styled.footer`
    margin-top: 50px;
    background-color: ${LightGrey};
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    height: 200px;
    & > div {
        text-align: center;
        color: ${DarkGrey};
        & > p > span {
            font-weight: bold;
        }
    }
`;
