import client from "./client";

// 댓글 좋아요 조회
export const getLikeComment = (commentSeq) =>
  client.get(`/api/like/comment/${commentSeq}`);

// 포스트 좋아요 조회
export const getLikePost = (postSeq) =>
  client.get(`/api/like/post/${postSeq}`);

// 포스트 좋아요 토글
export const postPostLikeToggle = (postSeq) =>
  client.post(`/api/like/post/${postSeq}`);

// 댓글 좋아요 토글
export const postCommentLikeToggle = (commentSeq) =>
  client.post(`/api/like/comment/${commentSeq}`);
