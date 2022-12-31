import { useState } from 'react'
import Loader from '../components/Loader'
import PostFeed from '../components/PostFeed'
import { getRecentPosts } from '../lib/firebase'

const LIMIT = 1

export async function getServerSideProps() {
  const posts = await getRecentPosts(LIMIT)

  return {
    props: {posts}
  }
}

export default function Home(props) {
  const [posts, setPosts] = useState(props.posts)
  const [loading, setLoading] = useState(false)
  const [postsEnd, setPostsEnd] = useState(false)

  const getMorePosts = async () => {
    setLoading(true)
 
    const cursor = posts[posts.length-1].createdAt
    const newPosts = await getRecentPosts(LIMIT, cursor)
    
    setPosts(posts.concat(newPosts))
    if (newPosts.length < LIMIT) {
      setPostsEnd(true)
    }
    setLoading(false)
  }

  return (
    <main>
      <PostFeed posts={posts} />

      {!loading && !postsEnd && <button onClick={getMorePosts}>Load more</button>}
      <Loader show={loading} /> 
      
      {postsEnd && "No more posts"}
    </main>
  )
}
