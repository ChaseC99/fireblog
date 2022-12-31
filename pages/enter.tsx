import { signInWithPopup } from "firebase/auth"
import { doc, getDoc, writeBatch } from "firebase/firestore"
import { useCallback, useContext, useEffect, useState } from "react"
import { UserContext } from "../lib/context"
import { auth, firestore, googleAuthProvider } from "../lib/firebase"
import debounce from 'lodash.debounce';
import Metatags from "../components/Metatags"


export default function EnterPage({}) {
    const { user, username } = useContext(UserContext)
    
    return (
        <main>
            <Metatags title={'FireBlog Signup'} />
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
    const [formValue, setFormValue] = useState('')
    const [isValid, setIsValid] = useState(false)
    const [loading, setLoading] = useState(false)

    const {user, username} = useContext(UserContext)

    useEffect(() => {
        checkUsername(formValue)
    }, [formValue])

    const checkUsername = useCallback(debounce(async (username) => {
        if (username.length >= 3){
            const user = await getDoc(doc(firestore, 'usernames', username))
            setIsValid(!user.exists())
            setLoading(false)
        }
    }, 500), [])

    const onSubmit = async (e) => {
        e.preventDefault()

        const userDoc = doc(firestore, 'users', user.uid)
        const usernameDoc = doc(firestore, 'usernames', formValue)

        const batch = writeBatch(firestore)
        batch.set(userDoc, {
            username: formValue,
            photoURL: user.photoURL,
            displayName: user.displayName
        })
        batch.set(usernameDoc, {
            uid: user.uid
        })

        await batch.commit()
    }

    const onChange = (e) => {
        const val = e.target.value.toLowerCase()
        const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/
        
        if (val.length < 3) {
            setFormValue(val)
            setLoading(false)
            setIsValid(false)
        }

        if (re.test(val)) {
            setFormValue(val)
            setLoading(true)
            setIsValid(false)
        }
    }

    return (
        !username && (
            <section>
                <h3>Choose Username</h3>
                <form onSubmit={onSubmit}>
                    <input name="username" placeholder="username" value={formValue} onChange={onChange}></input>
                    <UsernameMessage username={formValue} isValid={isValid} loading={loading} />
                    <button type="submit" className="btn-green" disabled={!isValid}>
                        Choose
                    </button>
                </form>

                <h3>Debug State</h3>
                <div>
                    Username: {formValue}
                    <br />
                    Loading: {loading.toString()}
                    <br />
                    Username Valid: {isValid.toString()}
                </div>
            </section>
        )
    )
}

function UsernameMessage({ username, isValid, loading}) {
    if (username.length < 3) {
        return <p>Username must be at least 3 characters</p>
    } else if (loading) {
        return <p>Checking...</p>
    } else if (isValid) {
        return <p className="text-success">{username} is available!</p>
    } else if (username && !isValid) {
        return <p className="text-danger">That username is taken!</p>
    } else {
        return null
    }
}