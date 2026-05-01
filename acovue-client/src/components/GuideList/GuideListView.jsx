import GuideListHeader from "./GuideListHeader";
import GuideListContent from "./GuideListContent";
import "./GuideListView.css";

export default function GuideListView({
    postList
}){
    return(
        <div className="guide-list-container">
            {/* 리스트 헤더 영역 */}
            <GuideListHeader/>
            {/* 리스트 바디(컨텐츠) 영역 */}

            {postList?.map((post) => (
                <GuideListContent key={post.postSeq} post={post}/>
            ))}
            
        </div>
    )
}
