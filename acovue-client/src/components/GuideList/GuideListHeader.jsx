import "./GuideListHeader.css"
import PostWriteButton from "../Common/PostWriteButton";

export default function GuideListHeader(){
    return(
        <div className="guide-list-header-container">
            <div className="guide-list-header-title-wrap">
                <span className="guide-list-header-marker" />
                <h1 className="guide-list-header-title">원정 가이드</h1>
            </div>
            <PostWriteButton/>
        </div>
    )
}
