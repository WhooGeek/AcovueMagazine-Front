import {formatTime} from"../Util/FormatTime";
import {Link} from "react-router-dom";
import "./GuideListContent.css";

const getPostCategoryPath = (category) => {
    if (category === "CONCERT_NEWS") return "concert-news";
    return category.toLowerCase();
};

export default function GuideListContent({post}){
    const categoryPath = getPostCategoryPath(post.post_category);

    return(
        <Link to ={`/${categoryPath}/${post.postSeq}`} className="guide-list-item-link">
            <article className="guide-list-item">

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

                <div className="guide-list-item-title-container">
                    <div className="guide-list-item-title">
                        {post.postTitle}
                    </div>
                    <div className="guide-list-item-meta-container">
                        <div className="guide-list-item-meta-nickname">{post.memberNickname}</div>
                        <div className="guide-list-item-meta-regdate">{formatTime(post.regDate)}</div>
                    </div>
                </div>

                

            </article>
        </Link>
    )
}
