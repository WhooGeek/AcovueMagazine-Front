import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import PostDetailView from "../../components/PostDetail/PostDetailView";
import { getPostDetail } from "../../api/Post.api";
import { getCommentCount, getCommentDetail } from "../../api/Comment.api";
import { getLikePost } from "../../api/Like.api";
import LoadingSkeleton from "../../components/Common/LoadingSkeleton";
import PageState from "../../components/Common/PageState";

export default function GuideDetailPage() {
  const { postId } = useParams();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const [postLikes, setPostLikes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const countComments = (commentList) =>
    commentList.reduce(
      (total, comment) => total + 1 + (comment.children?.length || 0),
      0
    );

  const fetchComments = async () => {

    try {
      const [commentRes, commentCountRes] = await Promise.all([
        getCommentDetail(postId),
        getCommentCount(postId).catch(() => null),
      ]);
      const nextComments = commentRes.data.data || [];
      setComments(nextComments);
      setCommentCount(commentCountRes?.data?.data?.commentCount ?? countComments(nextComments));
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
      getCommentCount(postId).catch(() => null),
      getLikePost(postId),
    ])
      .then(([postRes, commentRes, commentCountRes, likeRes]) => {
        const nextComments = commentRes.data.data || [];
        setPost(postRes.data.data);
        setComments(nextComments);
        setCommentCount(commentCountRes?.data?.data?.commentCount ?? countComments(nextComments));
        setPostLikes(likeRes.data.data.postLikeCount || 0);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
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
      commentCount={commentCount}
      onCommentSubmit={handleRefreshComments}
    />
  );
}
