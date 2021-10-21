import { types } from '../types/types'
import { firebase, googleAuthProvider } from '../utils/firebase-config'
import { GoogleSignin } from '@react-native-community/google-signin'

export const startLoginEmailPassword = (email, password) => {

	return dispatch => {
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(({user})=>{
				dispatch(login(user.uid, user.displayName, user.email))
			})
			.catch(e =>{
				console.log(e);
			})
	}
}

export const startGoogleLogin = () => {
	console.log('clicked')
	return dispatch => {
		const { idToken } =  GoogleSignin.signIn();
    const googleCredential = firebase.auth.GoogleAuthProvider.credential(idToken);
    
    console.log(googleCredential);
    // firebase.auth().signInWithPopup( googleAuthProvider )
    //   .then( ({ user }) => {
    //     dispatch(login(user.uid, user.displayName, user.email))
    //   })
	}
}

export const startRegisterWithEmailAndPassword = (email, password, displayName) =>{
	return ( dispatch ) => {
		firebase.auth().createUserWithEmailAndPassword( email, password )
		.then( async ({user})=>{
			await user.updateProfile({displayName: displayName})
			dispatch(login(user.uid, user.displayName, user.email))
		})
	}
}

export const login = (uid, displayName, email) => ({
	type: types.login,
	payload: {
		uid,
		displayName,
		email,
	},
})

export const startLogout = () => {
	return dispatch =>{
		firebase.auth().signOut();
		dispatch(logout())
	}
}

export const logout = () =>({
	type: types.logout
})