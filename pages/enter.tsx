import { signInWithPopup } from "firebase/auth"
import { auth, googleAuthProvider } from "../lib/firebase"

export default function EnterPage({}) {
    const user = null
    const username = null
    
    return (
        <main>
            {user ?
                !username ? <UsernameForm /> : <SignOutButton />
                :
                <SignInButton />
            }
        </main>
    )
}

function SignInButton(){
    const signInWithGoogle = async () => {
        await signInWithPopup(auth, googleAuthProvider)
    }
    return (
        <button className="btn-google" onClick={signInWithGoogle}>
            <img src='/google.png' /> Sign in with Google
        </button>
    )
}

function SignOutButton(){
    return <button onClick={() => auth.signOut()}>Sign Out</button>
}

function UsernameForm(){
    return null
}
