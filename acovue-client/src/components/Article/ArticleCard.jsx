import { useNavigate } from "react-router-dom";
import "./ArticleCard.css";

export default function ArticleCard({ data }) {

  const navigate = useNavigate();

  const handleCardClick = () => {

    const targetUrl = `/${data.post_category}/${data.postSeq}`;
    navigate(targetUrl);
  }



  return (
    <div className="article-card" onClick={handleCardClick}>
      <img className="article-image" src={data.imageUrl} alt={data.postTitle} />
      <h4>{data.postTitle}</h4>
    </div>
  );
}
