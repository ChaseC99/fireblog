import { collectionGroup, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore'
import { useState } from 'react'
import Loader from '../components/Loader'
import PostFeed from '../components/PostFeed'
import { firestore, postToJSON } from '../lib/firebase'

const LIMIT = 1

export async function getServerSideProps() {
  const postsRef = collectionGroup(firestore, 'posts')
  const postsQuery = query(
    postsRef, 
    where('published', '==', true),
    orderBy('createdAt', 'desc'),
    limit(LIMIT)
  )

  const posts = (await getDocs(postsQuery)).docs.map(post => postToJSON(post))

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

    const last = posts[posts.length-1]
    const cursor = last.createdAt // typeof last.createdAt === 'number' ? fromMi (last.createdAt) : last.createdAt

    const postsRef = collectionGroup(firestore, 'posts')
    const postsQuery = query(
      postsRef, 
      where('published', '==', true),
      orderBy('createdAt', 'desc'),
      startAfter(cursor),
      limit(LIMIT)
    )

    const newPosts = (await getDocs(postsQuery)).docs.map(post => postToJSON(post))
    setPosts(posts.concat(newPosts))
    setLoading(false)

    if (newPosts.length < LIMIT) {
      setPostsEnd(true)
    }
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
