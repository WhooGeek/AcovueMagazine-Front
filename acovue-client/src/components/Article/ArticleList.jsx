import ArticleCard from "./ArticleCard.jsx";
import "./ArticleList.css";

export default function ArticleList({ title, items }) {
  const safeItems = Array.isArray(items) ? items : [];

  return (
    <div className="article-container">
      <h2 className="article-title">{title}</h2>
      <div className="article-image-container" >
        {safeItems.map((item) => (
          <ArticleCard 
            key={item.postSeq} 
            data={item}
            category={item.post_category}
            />
        ))}
      </div>
    </div>
  );
}
