import { useState } from "react";
import { putComment, deleteComment, postComment } from "../../api/Comment.api";
import "./PostDetailComments.css"; // CSS 파일 import 확인

export default function CommentItem({ comment, postId, currentUser, onRefresh, isReply, parentSeqForReply }) {
  
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  
  const [editContent, setEditContent] = useState(comment.commentContent);
  const [replyContent, setReplyContent] = useState("");

  const isMyComment = currentUser && comment.userSeq && (currentUser.memberSeq === comment.userSeq);
  
  const handleUpdate = async () => {
    if (!editContent.trim()) return alert("내용을 입력하세요.");
    try {
      await putComment(postId, comment.commentSeq, { commentContent: editContent });
      setIsEditing(false);
      onRefresh(); 
    } catch (err) {
      alert("댓글 수정 실패");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await deleteComment(postId, comment.commentSeq);
        onRefresh();
      } catch (err) {
        alert("댓글 삭제 실패");
      }
    }
  };

  // 대댓글 등록
  const handleReplySubmit = async () => {
    if (!replyContent.trim()) return alert("내용을 입력하세요.");
    try {
      const targetParentSeq = isReply ? parentSeqForReply : comment.commentSeq;
      
      await postComment(postId, { commentContent: replyContent, parentSeq: targetParentSeq });
      
      setReplyContent("");
      setIsReplying(false);
      onRefresh();
    } catch (err) {
      alert("답글 등록 실패");
    }
  };

  return (
    <div 
      className={`comment-box ${isReply ? "is-reply" : ""}`} 
      style={{ marginLeft: isReply ? "40px" : "0px" }}
    >
      
      {/* 헤더 (이름 + 뱃지) */}
      <div className="comment-header">
        <span className="comment-name">{comment.userName}</span>
        {isReply && <span className="reply-badge">답글</span>}
      </div>

      {/* 본문 or 수정폼 */}
      {isEditing ? (
        <div className="edit-area">
          <textarea 
            className="comment-textarea"
            value={editContent} 
            onChange={(e) => setEditContent(e.target.value)} 
          />
          <div className="btn-group">
            <button className="cancel-btn" onClick={() => setIsEditing(false)}>취소</button>
            <button className="submit-btn" onClick={handleUpdate}>저장</button>
          </div>
        </div>
      ) : (
        <div className="comment-content">{comment.commentContent}</div>
      )}

      {/* 버튼 액션 (답글/수정/삭제) */}
      <div className="comment-actions">
        {/* 로그인 함 + 수정중 아님 + 대댓글 아님 -> 답글 버튼 노출 */}
        {currentUser && !isEditing && !isReply && (
           <button className="action-btn" onClick={() => setIsReplying(!isReplying)}>
             {isReplying ? "취소" : "답글 달기"}
           </button>
        )}

        {/* 내 댓글 + 수정중 아님 -> 수정/삭제 버튼 노출 */}
        {isMyComment && !isEditing && (
          <>
            <button className="action-btn" onClick={() => setIsEditing(true)}>수정</button>
            <button className="action-btn delete" onClick={handleDelete}>삭제</button>
          </>
        )}
      </div>

      {/* 대댓글 입력창 (답글 버튼 클릭 시) */}
      {isReplying && (
        <div className="reply-input-box">
          <textarea 
            className="comment-textarea"
            placeholder="답글을 남겨보세요..."
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
          />
          <div className="btn-group">
            <button className="submit-btn" onClick={handleReplySubmit}>등록</button>
          </div>
        </div>
      )}
    </div>
  );
}