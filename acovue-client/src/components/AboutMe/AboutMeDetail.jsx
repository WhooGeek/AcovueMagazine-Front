import "./AboutMeDetail.css";


export default function AboutMeDetail({post}){
    return(
        <article>
            <section className="aboutmeContainer">
                
                <div className="aboutmeContent">
                    <div className="post-content-view" dangerouslySetInnerHTML={{__html: post.about_me_content}} />
                </div>
            </section>
        </article>
    )
}