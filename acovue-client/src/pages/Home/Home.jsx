import "./Home.css";
import Guide from "../Guide/Guide.jsx";
import ConcertNews from "../ConcertNews/ConcertNews.jsx";
import Community from "../Community/Community.jsx";


export default function Home() {
  return (
    
    <div className="home-container">
        <div className="content-section">
          <Guide />
          <ConcertNews />
          <Community/>
        </div>
    </div>
  );
}
