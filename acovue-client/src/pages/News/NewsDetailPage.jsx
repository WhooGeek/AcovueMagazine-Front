import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import PostDetailView from "../../components/PostDetail/PostDetailView";
import { getPostDetail } from "../../api/Post.api";
import { getCommentDetail } from "../../api/Comment.api";
import { getLikePost } from "../../api/Like.api";
import LoadingSkeleton from "../../components/Common/LoadingSkeleton";
import PageState from "../../components/Common/PageState";

export default function NewsDetailPage() {
  const { postId } = useParams();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [postLikes, setPostLikes] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
    setLoading(true);
    setError(false);

    Promise.all([
      getPostDetail(postId),
      getCommentDetail(postId),
      getLikePost(postId),
    ])
      .then(([postRes, commentRes, likeRes]) => {
        setPost(postRes.data.data);
        setComments(commentRes.data.data || []);
        setPostLikes(likeRes.data.data.postLikeCount || 0);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));

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

  if (loading) return <LoadingSkeleton variant="detail" />;

  if (error || !post) {
    return (
      <PageState
        title="게시글을 불러오지 못했습니다"
        description="잠시 후 다시 시도해주세요."
        actionLabel="다시 시도"
        onAction={() => window.location.reload()}
      />
    );
  }

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
