import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from './LoginMutation.graphql.generated';

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
    <div className="login_background">
      <p className="login_system_name">魚電養殖資訊系統</p>
      <div className="login_container">
        <div>
          <p className="login_input_title">帳號</p>
          <input type="text" className="login_input" value={emailTmp} onChange={(e) => setEmailTmp(e.target.value)} />
        </div>
        <div>
          <p className="login_input_title">密碼</p>
          <input type="password" className="login_input" value={passwordTmp} onChange={(e) => setPasswordTmp(e.target.value)} />
        </div>
        <button type="button" className="login_button" onClick={onLoginButtonClicked}>登入</button>
        <p className="login_contact_txt">忘記密碼？ 請聯絡管理人員</p>
      </div>
      <p className="login_version">版號：v12345.67890</p>
    </div>
  );
}
