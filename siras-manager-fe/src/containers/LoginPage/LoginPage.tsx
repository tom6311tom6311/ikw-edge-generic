import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../commonApis/LoginMutation.graphql.generated';
import LogoImg from '../../img/logo_h.png';

export default function LoginPage() {
  const navigate = useNavigate();
  const [emailTmp, setEmailTmp] = useState('');
  const [passwordTmp, setPasswordTmp] = useState('');
  const [login, { data, error }] = useLoginMutation();
  if (error || data?.login === null) {
    localStorage.removeItem('x-token');
  } else if (data?.login) {
    localStorage.setItem('x-token', data.login);
    setTimeout(() => {
      navigate('/');
    });
  }
  const onLoginButtonClicked = () => {
    login({ variables: { email: emailTmp, password: passwordTmp } });
    setEmailTmp('');
    setPasswordTmp('');
  };
  return (
    // 768px*960px
    <div className="c-login-background">
      <img src={LogoImg} alt="logo" className="c-login-logo" />
      <div className="o-login">
        <div>
          <p className="c-login-title">帳號</p>
          <input type="text" className="c-login-input" placeholder="email" value={emailTmp} onChange={(e) => setEmailTmp(e.target.value)} />
        </div>
        <div>
          <p className="c-login-title">密碼</p>
          <input type="password" className="c-login-input" placeholder="*************" value={passwordTmp} onChange={(e) => setPasswordTmp(e.target.value)} />
        </div>
        <button type="button" className="c-login__button" onClick={onLoginButtonClicked}>登入</button>
        <p className="c-login__contact-text">忘記密碼？ 請聯絡管理人員</p>
      </div>
      {/* <p className="c-login-version">版號：v12345.67890</p> */}
    </div>
  );
}
