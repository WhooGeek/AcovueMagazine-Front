import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// defineConfig 안에 함수를 넣어서 mode를 받아올 수 있도록 설정
export default defineConfig(({ mode }) => {
  // 현재 폴더(process.cwd())에 있는 .env 파일 불러오기
  // 세 번째 인자를 ''로 두면 VITE_ 접두사가 없는 변수도 다 불러오기 가능
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          // .env 파일에 작성해둔 변수를 타겟으로 설정
          // EC2 서버 띄웠을 때
          target: env.EC2_API_URL, 
          // 로컬에서 테스트할 때
          // target: 'http://localhost:8080',
          changeOrigin: true,
        }
      }
    }
  }
})