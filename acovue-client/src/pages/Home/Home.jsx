import "./Home.css";
import News from "../News/News.jsx";
import Community from "../Community/Community.jsx";


export default function Home() {
  return (
    
    <div className="home-container">
        <div className="content-section">
          <News />
          
          <Community/>
        </div>
    </div>
  );
}
