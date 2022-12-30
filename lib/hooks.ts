import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "./firebase";

export function useProfile() {
    const [user] = useAuthState(auth)
    const [username, setUsername] = useState(null)

    useEffect(() => {
        let unsubscribe;

        if (user) {
            unsubscribe = onSnapshot(doc(firestore, 'users', user.uid), doc => {
                const result = doc.data()
                setUsername(result.username)
            })
        } else {
            setUsername(null)
        }

        return unsubscribe
    }, [user])

    return {user, username}
}