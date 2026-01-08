import client from "./client";

// 댓글 조회
export const getCommentDetail = (postId) =>
  client.get(`/api/post/comment/find/${postId}`);

// 댓글 등록
export const postComment = (postId, data) => {
  return client.post(`/api/post/comment/create/${postId}`, data)
}

// 댓글 수정
export const putComment = (postId, commentSeq, data) => {
    return client.put(`/api/post/comment/update/${postId}/${commentSeq}`, data)
}

// 댓글 삭제
export const deleteComment = (postId, commentSeq) =>{
  return client.delete(`/api/post/comment/delete/${postId}/${commentSeq}`)
}