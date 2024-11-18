import styled from 'styled-components';
import { DarkGrey, LightGrey, Orange } from '../../../color';

const Footer = () => {
    return (
        <FooterLayout>
            <div>
                <Terms>
                    <a href="/terms">이용 약관</a>
                    <a href="/privacyConsent">개인 정보 수집 및 이용 동의</a>
                    <a href="/privacy">개인정보처리방침</a>
                </Terms>
                <p>
                    <span>MataI c </span>2024 All Right Reserved
                </p>
                <p>맛알고리즘은 AI가 다수의 고객 리뷰를 정밀히 분석하여 숨겨진 인사이트를 찾아주는 서비스입니다.</p>
                <p>
                    <span>Email :</span> aktdkfrhflwma@gmail.com
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
        display: flex;
        flex-direction: column;
        gap: 10px;
        text-align: center;
        color: ${DarkGrey};
        & > p > span {
            font-weight: bold;
        }
    }
`;

const Terms = styled.p`
    display: flex;
    gap: 20px;
    justify-content: center;

    & > a {
        color: ${DarkGrey};
        text-decoration: none;
        font-size: 14px;
        font-weight: 700;

        &:hover {
            color: ${Orange};
            text-decoration: underline;
        }
    }
`;
