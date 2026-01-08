import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import PostDetailView from "../../components/PostDetail/PostDetailView";
import { getPostDetail } from "../../api/Post.api";
import { getCommentDetail } from "../../api/Comment.api";
import { getLikePost } from "../../api/Like.api";

export default function NewsDetailPage() {
  const { postId } = useParams();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [postLikes, setPostLikes] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);

  const fetchComments = async () => {

    try {
      const res = await getCommentDetail(postId);
      setComments(res.data.data); // 받아온 데이터로 state 업데이트
    } catch (err) {
      console.error("댓글 로딩 실패", err);
    }
  };

  useEffect(() => {
    
    getPostDetail(postId).then(res =>
      setPost(res.data.data)
    );

    fetchComments();

    getLikePost(postId).then(res =>
      setPostLikes(res.data.data.postLikeCount)
    );

    const token = localStorage.getItem("accessToken");

    if (token) {
      try {
        const decoded = jwtDecode(token);

        setCurrentUser({
            memberSeq: decoded.memberSeq, 
            name: decoded.sub,   
        });
        
        setIsLoggedIn(true);
      } catch (error) {
        console.error("토큰 해석 실패", error);
        setIsLoggedIn(false);
      }
    } else {
        setIsLoggedIn(false);
    }
  }, [postId]);

  const handleRefreshComments = () => {
    // API 다시 호출해서 comments 상태 업데이트하는 로직
    fetchComments(); 
  }

  if (!post) return <div>loading...</div>;

  return (
    <PostDetailView
      post={post}
      comments={comments}
      postLikes={postLikes}
      isLoggedIn={isLoggedIn}
      onCommentSubmit={handleRefreshComments}
      currentUser={currentUser}
    />
  );
}