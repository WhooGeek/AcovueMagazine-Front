import React from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';
import google_icon from "../../assets/google_icon.png";
import naver_icon from "../../assets/naver_icon.ico";

export default function LoginPage() {

    // 구글 로그인 핸들러
    const handleGoogleLogin = () => {
      // 구글 로그인 URL로 리다이렉트
      window.location.href = "http://52.78.166.206/oauth2/authorization/google";
    }

    // 네이버 로그인 핸들로
    const handleNaverLogin = () => {
      // 네이버 로그인 URL로 리다이렉트
      window.location.href = "http://52.78.166.206/oauth2/authorization/naver";
    }

  return (
    <div className="login-container">
      <div className="login-box">
        {/* 1. 로고 또는 타이틀 */}
        <h1 className="login-logo">렛츠젠츠</h1>
        <p className="login-subtitle">소셜 계정으로 빠르게 로그인하세요.</p>

        {/* 구분선 */}
        <div className="social-divider">
          <span>간편 로그인</span>
        </div>

        {/* 소셜 로그인 버튼들 */}
        <div className="social-login-group">
          <button className="social-btn google" onClick={handleGoogleLogin}>
            <img className="social-icon" src={google_icon} alt="google" />
            Google로 로그인
          </button>
          <button className="social-btn naver" onClick={handleNaverLogin}>
            <img className="social-icon" src={naver_icon} alt="naver" />
            네이버로 로그인
          </button>
        </div>

        <div className="admin-login-guide">
          관리자이신가요?{" "}
          <Link to="/admin/login" className="admin-login-link">
            관리자 로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
