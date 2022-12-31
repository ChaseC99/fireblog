import PostFeed from "../../components/PostFeed";
import UserProfile from "../../components/UserProfile";
import { getUserPosts, getUserWithUsername } from "../../lib/firebase";

export async function getServerSideProps({ query: q }){
    const { username } = q
    const user = await getUserWithUsername(username)
    let posts = null

    if (user) {
        posts = await getUserPosts(user.username)
    }

    return {
        props: {user, posts}
    }
}

export default function UserPage({user, posts}) {
    return (
        <main>
            <UserProfile user={user} />
            <PostFeed posts={posts} />
        </main>
    )
}