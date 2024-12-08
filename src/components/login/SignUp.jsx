import styled from 'styled-components';
import { Grey, DarkGreen } from '../../color';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormField from '../common/form/FormField';
import { SIGNUP_FORM_ITEMS } from '../../constants/formItems';
import { signUp } from '../../apis/api/postSignupForm';
import { Button } from '../common';
import Swal from 'sweetalert2';

const Signup = ({ isAllConsent }) => {
    const navigate = useNavigate();
    const [signupForms, setSignupForms] = useState({
        email: '',
        password: '',
        nickname: '',
        serviceAgreement: isAllConsent,
        privacyAgreement: isAllConsent,
        ageConfirmation: isAllConsent,
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
        nickname: '',
    });

    const verifyEmail = (email) => {
        const regExp = /\S+@\S+\.\S+/.test(email);
        setErrors((prev) => ({ ...prev, email: regExp ? '' : '유효한 이메일 주소가 아닙니다.' }));
    };

    const verifyPassword = (password) => {
        const regExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password);
        setErrors((prev) => ({
            ...prev,
            password: regExp ? '' : '올바른 비밀번호를 입력해주세요.',
        }));
    };

    const verifyInputs = () => {
        return !errors.email && !errors.password && !errors.nickname;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupForms((prev) => ({ ...prev, [name]: value }));
        if (name === 'email') verifyEmail(value);
        if (name === 'password') verifyPassword(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!verifyInputs()) return;
        const response = await signUp(signupForms);

        if (response.status !== 201) {
            const errorMessage = response.error.message;
            if (response.status === 409) {
                setErrors((prev) => ({
                    ...prev,
                    nickname: '중복된 닉네임 입니다.',
                }));
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: '회원가입 실패',
                    text: errorMessage,
                });
            }
        }

        if (response.status === 201) {
            Swal.fire({
                icon: 'success',
                title: '회원가입 성공',
                text: '회원 가입 성공',
            });

            navigate('/login');
        }
    };

    return (
        <AuthLayout>
            <FormBox>
                <h1>회원 가입</h1>
                <AuthBox onSubmit={handleSubmit}>
                    {SIGNUP_FORM_ITEMS.map((form) => (
                        <FormField
                            key={form.type}
                            type={form.type}
                            name={form.type}
                            value={form[form.type]}
                            placeholder={form.placeholder}
                            error={errors[form.type]}
                            onChange={handleChange}
                            mode="signup"
                        />
                    ))}
                    <Button text="가입하기" color="orange" visible="true" type="submit" onClickHandler={handleSubmit} />
                </AuthBox>
            </FormBox>
        </AuthLayout>
    );
};

export default Signup;

const AuthLayout = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    margin-top: 100px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const AuthBox = styled.form`
    width: 100%;
    border: 1px solid ${Grey};
    border-radius: 10px;
    padding: 30px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    gap: 10px;
`;

const FormBox = styled.div`
    min-width: 30%;
    height: auto;
    & > h1 {
        font-weight: 700;
        margin-bottom: 10px;
        color: ${DarkGreen};
    }
    @media (max-width: 768px) {
        min-width: 80%;
    }
`;
