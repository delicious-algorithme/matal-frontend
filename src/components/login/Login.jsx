import { useState } from 'react';
import { LOGIN_FORM_ITEMS, LOGIN_ERROR_MESSAGE } from '../../constants/formItems';
import { login } from '../../apis/api/login';
import { useLogin } from '../../store';
import { useNavigate } from 'react-router-dom';
import FormField from '../common/form/FormField';
import { Button } from '../common';
import styled from 'styled-components';
import { Grey, DarkGreen } from '../../color';
import Swal from 'sweetalert2';

const Login = () => {
    const { setLogin } = useLogin();
    const navigate = useNavigate();

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await login(loginForm);
        console.log(response);
        if (response.status === 200) {
            navigate('/');
            setLogin(loginForm.email);
            Swal.fire({
                icon: 'success',
                title: '로그인 성공',
                text: '로그인 성공',
            });
        } else {
            setError(LOGIN_ERROR_MESSAGE);
        }
    };

    return (
        <AuthLayout>
            <FormBox>
                <h1>로그인</h1>
                <AuthBox onSubmit={handleSubmit}>
                    {LOGIN_FORM_ITEMS.map((form) => (
                        <FormField
                            key={form.type}
                            type={form.type}
                            name={form.type}
                            error={error}
                            value={form[form.type]}
                            placeholder={form.placeholder}
                            onChange={handleChange}
                        />
                    ))}
                    <Button
                        text="로그인하기"
                        color="orange"
                        visible="true"
                        type="submit"
                        onClickHandler={handleSubmit}
                    />
                </AuthBox>
            </FormBox>
        </AuthLayout>
    );
};

export default Login;

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
