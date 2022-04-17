import * as React from 'react';

export default function LoginPage() {
  return (
    // 768px*960px
    <div className="login_background">
      <p className="login_system_name">魚電養殖資訊系統</p>
      <div className="login_container">
        <div>
          <p className="login_input_title">帳號</p>
          <input type="text" className="login_input" />
        </div>
        <div>
          <p className="login_input_title">密碼</p>
          <input type="password" className="login_input" />
        </div>
        <button type="button" className="login_button">登入</button>
        <p className="login_contact_txt">忘記密碼？ 請聯絡管理人員</p>
      </div>
      <p className="login_version">版號：v12345.67890</p>
    </div>
  );
}
