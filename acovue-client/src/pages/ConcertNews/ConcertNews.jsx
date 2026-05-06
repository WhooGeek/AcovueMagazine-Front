import { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import "./ConcertNews.css";
import { formatTime } from "../../components/Util/FormatTime";


export default function ConcertNews() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("/api/post/find/all?type=CONCERT_NEWS&limit=3&page=1")
        .then((res) => res.json())
        .then((data) => setPosts(data.data));
    }, []);



    return(
        <div className="concert-news-section">
            <h2 className="concert-news-title">공연 소식</h2>
            <div className="concert-news-list">
                {posts.map((post) => (
                    <Link key={post.postSeq} to={`/concert-news/${post.postSeq}`} className="concert-news-link">
                        <div className="concert-news-item">
                            <div className="guide-list-item-image-container">
                                {post.thumbnailUrl? (
                                    /*이미지 있을 때*/ 
                                    <img className="guide-list-item-image" src={post.thumbnailUrl} alt={post.postTitle}/>
                                ) : (
                                    /* 이미지가 없을 때 */
                                    <div className="no-image-placeholder">
                                        <span> no image </span>
                                    </div>
                                )}
                            </div>
                            <h3>{post.postTitle}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
