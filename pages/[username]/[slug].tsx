import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Metatags from "../../components/Metatags";
import { getAllPosts, getPostBySlug, getUserWithUsername } from "../../lib/firebase"

export async function getStaticProps({ params }) {
    const { username, slug } = params

    const user = await getUserWithUsername(username)

    let post;
    let path = null;

    if (user) {
        post = await getPostBySlug(user.username, slug)
    }

    return {
        props: { post, path }
    }
}

export async function getStaticPaths() {
    const posts = await getAllPosts()
    
    const paths = posts.map(doc => {
        const {username, slug} = doc.data()
        return {
            params: { username, slug }
        }
    })

    return {
        paths,
        fallback: 'blocking'
    }
}

export default function PostPage(props) {
    const { post } = props

    return (
        <main>
            <Metatags title={post.title} />
            <div className="card">
                <h1>{post.title}</h1>
                <span className="text-sm">
                    Written by{' '}
                    <Link href={`/${post.username}`}>
                        @{post.username}
                    </Link>{' '}
                    on {post.createdAt}
                </span>
                <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
        </main>
    )
}