import Metatags from "../../components/Metatags";
import PostFeed from "../../components/PostFeed";
import UserProfile from "../../components/UserProfile";
import { getUserPosts, getUserWithUsername } from "../../lib/firebase";

export async function getServerSideProps({ query: q }){
    const { username } = q
    const user = await getUserWithUsername(username)
    
    if (!user) {
        return {
            notFound: true
        }
    }

    let posts = await getUserPosts(user.username)

    return {
        props: {user, posts}
    }
}

export default function UserPage({user, posts}) {
    return (
        <main>
            <Metatags title={`${user.displayName}'s Posts`} />
            <UserProfile user={user} />
            <PostFeed posts={posts} />
        </main>
    )
}