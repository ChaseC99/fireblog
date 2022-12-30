import Link from "next/link"

export default function PostFeed({ posts, admin=false }) {
    return posts && posts.map(post => 
        <Post post={post} key={post.slug}/>
    )
}

function Post({ post, admin=false }) {
    const wordCount = post.content.trim().split(' ').length
    const minsToRead = (wordCount / 100 + 1).toFixed(0)

    return (
        <div className="card">
            <Link href={`/${post.username}`}>
                <strong>By @{post.username}</strong>
            </Link>

            <Link href={`/${post.username}/${post.slug}`}>
                <h2>
                    {post.title}
                </h2>
            </Link>

            <footer>
                <span>
                    {wordCount} words. {minsToRead} min read.
                </span>
                <span>❤️ {post.heartCount} Hearts</span>
            </footer>
        </div>
    )
}