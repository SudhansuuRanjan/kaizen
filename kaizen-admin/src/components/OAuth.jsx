import { useLocation, useNavigate } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import { setDoc, doc, serverTimestamp, getDoc } from 'firebase/firestore'


const OAuth = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const handleOAuth = async () => {
        try {
            const auth = getAuth()
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider)
            const user = result.user

            // Check if user exists in firestore
            const userRef = doc(db, 'users', user.uid)
            const userDoc = await getDoc(userRef)

            // If user does not exist in firestore, create a new document
            if (!userDoc.exists()) {
                await setDoc(userRef, {
                    name: user.displayName,
                    email: user.email,
                    cart: [],
                    timestamp: serverTimestamp()
                })
            }
            navigate('/events');
            toast.success('Logged In Successfully!');
        } catch (error) {
            // toast.error('Bad User Credentials')
            console.log(error)
        }
    }

    return (
        <>
            <button onClick={handleOAuth} className='bg-gray-800 py-2 px-4 flex rounded-md bitems-center justify-between w-[13rem] shadow'>
                <img src="https://cdn.cdnlogo.com/logos/g/35/google-icon.svg" alt="google" className='h-6 w-6' /> <p>Sign{location.pathname === '/signup' ? 'Up' : 'In'} with Google</p>
            </button>
        </>
    )
}

export default OAuth