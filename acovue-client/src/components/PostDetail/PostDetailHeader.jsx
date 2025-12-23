import "./PostDetailHeader.css"
import {formatTime} from "../../components/Util/FormatTime.jsx";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function PostDetailHeader({ post }) {

  const navigate = useNavigate();
  const [canEdit, setCanEdit] = useState(false); // 버튼 노출 상태 관리

  useEffect(() => {
    const checkPermission = () => {
      const token = localStorage.getItem("accessToken");
      if(!token) return;

      try {
        const decoded = jwtDecode(token);

        const currentUserSeq = decoded.memberSeq;
        const currentUserRole = decoded.auth;

        if(currentUserSeq == post.memberSeq || currentUserRole === "ADMIN"){
          setCanEdit(true);
        }
      } catch (error){
        console.error("Token decoding error:", error);
      }
    };

    if(post){
      checkPermission();
    }
  }, [post]);


  // 수정 버튼 핸들러
  const handleEdit = () => {
    navigate(`/NEWS/${post.postSeq}/edit`, { state: { post } });
  };

  // 삭제 버튼 핸들러
  const handleDelete = async () => {
    if (window.confirm("정말로 이 게시물을 삭제하시겠습니까?")) {
      try{
        alert(" 삭제 되었습니다. ");
        navigate("/news?page=1&limit=5&type=NEWS")
      }catch(error){
        console.error("Error deleting post:", error);
      }
    }
  };

  if (!post) return null;

  return (
    <div className="post-header">
      <div className="post-title">{post.postTitle}</div>
      <div className="post-under-title">
        <div className="post-under-title-text">
          <div className="post-nickname">작성자 : {post.memberNickname}</div>
          <div className="post-regdate">작성일 : {formatTime(post.regDate)}</div>
        </div>
        {canEdit && (
          <div className="post-under-title-edit">
            <button className="post-edit-button" onClick={handleEdit}>수정</button>
            <button className="post-delete-button" onClick={handleDelete}>삭제</button>
          </div>
        )}
        

      </div>
      
    </div>
  );
}
