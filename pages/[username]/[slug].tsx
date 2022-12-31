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

export default function PostPage({}) {
    return (
        <main>
            <h1>Post Page</h1>
        </main>
    )
}