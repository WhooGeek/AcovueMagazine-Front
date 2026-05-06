import { useEffect, useState } from "react";
import ArticleList from "../../components/Article/ArticleList.jsx";

export default function Guide() {
  const [guide, setGuide] = useState([]);

  useEffect(() => {
    fetch("/api/post/find/all?type=GUIDE&limit=3&page=1")
      .then((res) => res.json())
      .then((data) => setGuide(data.data));
  }, []);

  return (
    <ArticleList title="원정 가이드" items={guide} />
  );
}
