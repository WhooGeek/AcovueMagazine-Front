import "./PostDetailContent.css";

export default function PostDetailContent({post}){
    const cleanContent = post.postContent
        .replace(/width="[^"]*"/gi, '')             // width="1150" 제거
        .replace(/height="[^"]*"/gi, '')            // height="500" 제거
        .replace(/style="[^"]*"/gi, '');          // height="500" 속성 제거

    return (
        // 여기에 스타일로 직접 maxWidth를 줘도 좋아! (위에 제목 크기랑 맞춰서)
        <div className="PostDetailContentContainer">
            <div 
                className="post-content-view" 
                // ⭐️ 원본 post.postContent 대신 찌꺼기를 제거한 cleanContent를 넣음
                dangerouslySetInnerHTML={{ __html: cleanContent }} 
            />
        </div>
    )
}