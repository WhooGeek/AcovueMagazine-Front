import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const OAuthRedirectHandler = () => {
    //URL 뒤에 붙은 쿼리 파라미터를 가져오기 위한 훅
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        // 쿼리 파라미터에서 accessToken과 refreshToken을 가져옴
        const accessToken = searchParams.get('accessToken');
        const refreshToken = searchParams.get('refreshToken');
        
        if (accessToken) {
            // 토큰을 localStorage에 저장
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            console.log("토큰 저장 완료:");
            
            // 홈으로 리다이렉팅
            // 뒤로가기 눌러도 토큰 있는 URL로 이동 X
            navigate('/', { replace : true }); 

        } else{
            // 토큰 안넘어올때
            console.error("토큰이 URL에 없습니다.");
            navigate('/login', { replace : true }); // 로그인 페이지로 리다이렉트
        }
    }, [searchParams, navigate]);

    return (
        <div>
            <h2>OAuth 로그인 중...</h2>
        </div>
    );
};

export default OAuthRedirectHandler;