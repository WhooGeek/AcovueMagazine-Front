
export default function PostDetailContent({post}){
    return(
        <div className="PostDetailContentContainer">
            <div className="post-content-view" dangerouslySetInnerHTML={{__html: post.postContent}} />
            
        </div>
    )
}