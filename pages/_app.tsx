import '../styles/globals.css'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Toaster } from 'react-hot-toast'
import Navbar from '../components/Navbar'
import { UserContext } from '../lib/context'
import { useProfile } from '../lib/hooks'

function MyApp({ Component, pageProps }) {
  const userData = useProfile()  

  return (
    <UserContext.Provider value={userData}>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>
  )
    
}

export default MyApp
