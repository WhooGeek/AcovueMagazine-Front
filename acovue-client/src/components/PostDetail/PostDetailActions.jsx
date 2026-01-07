import React, {useState, useEffect} from "react";
import "./PostDetailActions.css"
import LikesImage from "../../assets/Likes.png";
import CommentImage from "../../assets/Comment.png";
import { postPostLikeToggle } from "../../api/Like.api"

export default function PostDetailActions({ post, postLikes, commentCount, isLiked = false }) {

  const [likeCount, setLikeCount] = useState(postLikes);
  const [liked, setLiked] = useState(isLiked);

  // props가 변경되면 state도 업데이트 (데이터 로딩 시점 차이 해결)
  useEffect(() => {
    setLikeCount(postLikes);
    setLiked(isLiked);
  }, [postLikes, isLiked]);

  const handleLikeToggle = async () => {
    try {

      await postPostLikeToggle(post.postSeq);

      if (liked) {
        setLikeCount(likeCount - 1);
        setLiked(false);
      } else {
        setLikeCount(likeCount + 1);
        setLiked(true);
      }
    } catch (error) {
      console.error("좋아요 토글 중 오류 발생:", error);
      alert("좋아요 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="post-actions">
      <span className="action-item" onClick={handleLikeToggle}>
        <img src={LikesImage} alt="좋아요" className="likesImage"/>
            <a className="like-text">좋아요</a> 
            <a className="like-count">{likeCount}</a>
      </span>

      <span className="action-item">
        <img src={CommentImage} alt="댓글" className="commentImage" />
            <a className="comment-text">댓글</a>
            <a>
                {commentCount}
            </a>
      </span>
    </div>
  );
}
