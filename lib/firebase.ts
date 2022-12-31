import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { collection, collectionGroup, DocumentData, DocumentSnapshot, getDocs, getFirestore, limit, orderBy, query, QueryConstraint, startAfter, Timestamp, where } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTp9GWgih2WGHt6-Fdn6jFRstfeEErsPo",
  authDomain: "fireblog-99.firebaseapp.com",
  projectId: "fireblog-99",
  storageBucket: "fireblog-99.appspot.com",
  messagingSenderId: "900953574105",
  appId: "1:900953574105:web:06a7777f5bb31055ad8cc8"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const googleAuthProvider = new GoogleAuthProvider()
export const firestore = getFirestore(app)
export const storage = getStorage(app)


// HELPER FUNCTIONS
export async function getUserWithUsername(username): Promise<DocumentData> {
  const usersRef = collection(firestore, "users")
  const userQuery = query(usersRef, where('username', '==', username))
  const userDoc = (await getDocs(userQuery)).docs[0]
  return userDoc ? userDoc.data() : null
}

export async function getUserPosts(username) {
  console.log(username)
  const postsQuery = query(
    collectionGroup(firestore, 'posts'),
    where('username', '==', username),
    where('published', '==', true),
    orderBy('createdAt', 'desc'),
    limit(5)
  )
  return (await getDocs(postsQuery)).docs.map(post => postToJSON(post))
}

export async function getRecentPosts(postsLimit: number, startAt?: string) {
  const postsRef = collectionGroup(firestore, 'posts')
  const filters: QueryConstraint[] = [
    where('published', '==', true),
    orderBy('createdAt', 'desc'),
  ]

  if (startAt) {
    const cursor = typeof startAt === 'number' ? Timestamp.fromMillis(startAt) : startAt
    console.log('cursor', cursor, typeof cursor)
    filters.push(startAfter(cursor))
  }

  const postsQuery = query(
    postsRef,
    ...filters,
    limit(postsLimit)
  )

  return (await getDocs(postsQuery)).docs.map(post => postToJSON(post))
}

export function postToJSON(doc: DocumentSnapshot) {
  const data = doc.data()

  return {
    ...data,
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis()
  }
}