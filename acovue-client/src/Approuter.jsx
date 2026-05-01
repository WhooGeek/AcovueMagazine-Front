import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import AboutMePage from "./pages/About/About";
import AboutMeUpdatePage from "./pages/About/AboutMeUpdatePage";
import NewsListPage from "./pages/News/NewsListPage";
import NewsDetailPage from "./pages/News/NewsDetailPage";
import NewsCreatePage from "./pages/News/NewsCreatePage";
import ConcertNewsPage from "./pages/ConcertNews/ConcertNewsListPage";
import ConcertNewsDetailPage from "./pages/ConcertNews/ConcertNewsDetailPage";
import ConcertNewsCreatePage from "./pages/ConcertNews/ConcertNewsCreatePage";
import CommunityListPage from "./pages/Community/CommunityListPage";
import CommunityDetailPage from "./pages/Community/CommunityDetailPage";
import CommunityCreatePage from "./pages/Community/CommunityCreatePage";
import CommonUpdatePage from "./pages/Common/CommonUpdatePage";
import LoginPage from "./pages/Login/LoginPage";
import AdminLoginPage from "./pages/Login/AdminLoginPage";
import Mypage from "./pages/Mypage/Mypage";
import OAuthRedirectHandler from "./components/Util/OAuthRedirectHandler";

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/about_me/" element={<AboutMePage/>}/>
            <Route path="/about_me/update" element={<AboutMeUpdatePage prevPath="/about_me"/>}/>
            <Route path="/news/" element={<NewsListPage/>} />
            <Route path="/news/:postId/" element={<NewsDetailPage />} />
            <Route path="/news/create" element={<NewsCreatePage/>}/>
            <Route path="/news/:postId/update" element={<CommonUpdatePage category="NEWS" boardTitle="뉴스 수정" prevPath="/news?page=1&limit=5&type=NEWS"/>}/>
            <Route path="/concert-news" element={<ConcertNewsPage/>}/>
            <Route path="/concert-news/:postId" element={<ConcertNewsDetailPage />} />
            <Route path="/concert-news/create" element={<ConcertNewsCreatePage/>}/>
            <Route path="/concert-news/:postId/update" element={<CommonUpdatePage category="CONCERT_NEWS" boardTitle="공연 소식 수정" prevPath="/concert-news?page=1&limit=5&type=CONCERT_NEWS"/>}/>
            <Route path="/community/" element={<CommunityListPage/>}/>
            <Route path="/community/:postId/" element={<CommunityDetailPage/>} />
            <Route path="/community/create" element={<CommunityCreatePage/>}/>
            <Route path="/community/:postId/update" element={<CommonUpdatePage category="COMMUNITY" boardTitle="커뮤니티 수정" prevPath="/community?page=1&limit=5&type=COMMUNITY"/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/admin/login" element={<AdminLoginPage/>}/>
            <Route path="/mypage" element={<Mypage/>} />
            <Route path="/oauth/redirect" element={<OAuthRedirectHandler />} />
            
        </Routes>
    )
}