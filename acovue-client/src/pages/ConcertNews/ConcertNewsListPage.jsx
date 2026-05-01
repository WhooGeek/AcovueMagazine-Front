import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getPostList } from "../../api/Post.api";
import "./ConcertNewsListPage.css";
import PostWriteButton from "../../components/Common/PostWriteButton";


export default function ConcertNewsPage() {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);
  const initialFetchRef = useRef(false);
  const fetchingRef = useRef(false);

  const fetchPosts = async () => {
    if (loading || !hasMore) return;

    fetchingRef.current = true;

    try{
      setLoading(true);
      setError(false);

      const res = await getPostList(8, page, "CONCERT_NEWS");
      const nextPosts = res.data.data || [];

      setPosts((prevPosts) => [...prevPosts, ...nextPosts]);
      setPage((prevPage) => prevPage + 1);

      if(nextPosts.length < 8){
        setHasMore(false);
      }
    } catch(error){
      setError(true);
    } finally {
      setLoading(false);
      fetchingRef.current = true;
    }
  };


  useEffect(() => {
    if (initialFetchRef.current) return;

    initialFetchRef.current = true;

    fetchPosts();
  }, []);

  useEffect(() => {
    if (!posts.length) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading && hasMore){
        fetchPosts();
      }
    });

    if(loaderRef.current){
      observer.observe(loaderRef.current);
    }
    
    return() => {
      observer.disconnect();
    };
  }, [loading, hasMore, page, posts.length]);


  return (
    <main className="concert-news-page">
      <section className="concert-news-section">
        <header className="concert-news-header">
          <div className="concert-news-title-wrap">
            <span className="concert-news-marker" />
            <h1>공연 소식</h1>
          </div>
          
          <PostWriteButton/>
        </header>

        <div className="concert-news-grid">
          {posts.map((post) => (
            <Link 
            to={`/concert-news/${post.postSeq}`} 
            key={post.postSeq} 
            className="concert-news-card">

              <div className="concert-news-thumbnail">
                {post.thumbnailUrl ? (
                  <img src={post.thumbnailUrl} alt={post.postTitle} />
                ) : (
                  <div className="concert-news-placeholder" />
                )}
              </div>

              <h2>{post.postTitle}</h2>
              <p>{post.memberName} {formatTime(post.regDate)}</p>
            </Link>
          ))}
        </div>

        <div ref={loaderRef} className="concert-news-loader">
          {loading && "불러오는 중..."}
          {!hasMore && "마지막 공연 소식입니다."}
          {error && "공연 소식을 불러오지 못했습니다."}
        </div>

        
      </section>
    </main>

  );
}
