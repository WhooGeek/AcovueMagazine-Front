import { useEffect, useState } from "react";
import ArticleList from "../../components/Article/ArticleList.jsx";

export default function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch("/api/post/find/all?type=NEWS&limit=1")
      .then((res) => res.json())
      .then((data) => setNews(data.data));
  }, []);

  return (
    <ArticleList title="NEWS" items={news} />
  );
}
