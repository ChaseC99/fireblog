import { collection, where, query, orderBy, limit, getDocs } from "firebase/firestore";
import PostFeed from "../../components/PostFeed";
import UserProfile from "../../components/UserProfile";
import { firestore, getUserWithUsername, postToJSON } from "../../lib/firebase";

export async function getServerSideProps({ query: q }){
    const { username } = q
    const userDoc = await getUserWithUsername(username)

    let user = null
    let posts = null

    if (userDoc) {
        user = userDoc.data()
        const postsQuery = query(
            collection(firestore, 'users', `${user.uid}/posts`),
            where('published', '==', true),
            orderBy('createdAt', 'desc'),
            limit(5)
        )
        posts = (await getDocs(postsQuery)).docs.map(post => postToJSON(post))
    }

    return {
        props: {user, posts}
    }
}

export default function UserPage({user, posts}) {
    return (
        <main>
            <h1>User Page</h1>
            <UserProfile user={user} />
            <PostFeed posts={posts} />
        </main>
    )
}