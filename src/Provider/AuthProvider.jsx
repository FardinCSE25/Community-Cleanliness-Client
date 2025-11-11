import React, { createContext, useEffect, useState } from 'react';
import app from '../Firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext()

const googleProvider = new GoogleAuthProvider()
const auth = getAuth(app)
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    // console.log(user);

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const resetPass = (email) =>{
        return sendPasswordResetEmail(auth, email)
    }

    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const updateUser = (updatedData) => {
        return updateProfile(auth.currentUser, updatedData)
    }

    const logOut = () => {
        return signOut(auth);
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        });
        return () => {
            unSubscribe()
        }
    }, [])

    const authInfo = {
        user,
        setUser,
        createUser,
        logOut,
        login,
        googleSignIn,
        loading,
        updateUser,
        resetPass,
        setLoading
    }
    return <AuthContext value={authInfo}>
        {children}
    </AuthContext>
};

export default AuthProvider;