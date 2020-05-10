import React from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import palette from '../../lib/styles/palette'
import Button from '../common/Button'

const AuthFormBlock = styled.div`
    h3 {
        margin: 0;
        color: ${palette.gray[8]};
        margin-bottom: 1rem;
    }
`

const StyledInput = styled.input`
    font-size: 1rem;
    border: none;
    border-bottom: 1px solid ${palette.gray[5]};
    padding-bottom: 0.5rem;
    outline: none;
    width: 100%;
    &:focus{
        color: $oc-teal-7;
        border-bottom: 1px solid ${palette.gray[7]};
    }

    & + & {
        margin-top: 1rem;
    }
`

const Footer = styled.div`
    margin-top: 2rem;
    text-align: right;
    a {
        color: ${palette.gray[6]};
        text-decoration: underline;
        &:hover{
            color: ${palette.gray[9]};
        }
    }
`

const ButtonWithMarginTop = styled(Button)`
    margin-top: 1rem;
`

const textMap = {
    login: '로그인',
    register: '회원가입',
}

const AuthForm = ({ type, form, onChange, onSubmit }) => {
    const text = textMap[type]
    return (
        <AuthFormBlock>
            <h3>{text}</h3>
            <form onSubmit={onSubmit}>
                <StyledInput 
                autoComplete="username" 
                name="username" 
                placeholder="id" 
                onChange={onChange}
                value={form.username}
                />
                <StyledInput
                    autoComplete="new-password"
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={onChange}
                    value={form.password}
                />
                {type === 'register' && (
                    <StyledInput
                        autoComplete="new-password"
                        name="passwordConfirm"
                        placeholder="Confirm Password"
                        type="password"
                        />
                )}
                <ButtonWithMarginTop cyan fullWidth style={{ marginTop: '1rem' }}>{text}</ButtonWithMarginTop>
            </form>
            <Footer>
                {type === 'login' ? (
                    <Link to ="/register">회원가입</Link>
                ) : (
                    <Link to ="/login">로그인</Link>
                )}
            </Footer>
        </AuthFormBlock>
    );
};

export default AuthForm;